import pandas as pd
import numpy as np
import re
import json
import sys
from unidecode import unidecode
from gensim.models import KeyedVectors
from nltk.tokenize import word_tokenize
from sklearn.metrics.pairwise import cosine_similarity
import os
import logging

#import googlemaps as gmaps

import nltk

nltk.download('punkt_tab')

# Caminhos do modelo de texto e binário
model_text_path = '/code/backend/src/database/pyscripts/modelos/glove_s50.txt'
model_binary_path = '/code/backend/src/database/pyscripts/modelos/glove_s50.bin'

# Função para carregar o modelo com persistência
def carregar_modelo():
    if os.path.exists(model_binary_path):
        logging.info("Carregando o modelo binário otimizado...")
        model = KeyedVectors.load(model_binary_path)
    else:
        logging.info("Carregando o modelo em formato de texto pela primeira vez e salvando em binário...")
        model = KeyedVectors.load_word2vec_format(model_text_path)
        model.save(model_binary_path)  # Salva o modelo em binário para carregamento futuro
    logging.info("Modelo carregado com sucesso!")
    return model

# Carrega o modelo
word2vec_model = carregar_modelo()

###################### DEFINIÇAO DAS FUNCOES #######################
'''def sim_local(localizacao_candidato, localizacao_vaga, dist_max):
    try:
        distancia = gmaps.distance_matrix(localizacao_candidato, localizacao_vaga, mode="driving")
        if distancia['rows'][0]['elements'][0]['distance']['value'] <= dist_max:
            return 1.0
    except:
        return  0.0'''
def sim_local(localizacao_candidato, localizacao_vaga):
    if localizacao_vaga == localizacao_candidato:
        return 1.0  # Mesmo local
    else:
        return 0.0
    
    
def sim_salario(salario_candidato_min,  salario_vaga_max):
    if salario_vaga_max == 0:
        return 0.5 # faixa salarial não definida
    if float(salario_candidato_min) <= float(salario_vaga_max):
        return 1.0  # Dentro da faixa salarial
    else:
        return 0.0  # Fora da faixa salarial
    
def get_text_embedding(text, model):
    text = re.sub(r'[^a-zA-Z0-9\s]', '', unidecode(text.lower()))#re.sub(r'[^a-zA-ZÀ-ÿç\s]', '', text.lower())
    tokens = word_tokenize(text.lower(), language="portuguese")  # Tokenizar e converter para minúsculas
    word_vectors = [model[word] for word in tokens if word in model]
    
    if word_vectors:
        return np.mean(word_vectors, axis=0)  # Média dos vetores das palavras
    else:
        return np.zeros(model.vector_size)  # Vetor zero se não houver palavras no vocabulário

def cosine_similarity_embeddings(embedding1, embedding2):
    return cosine_similarity([embedding1], [embedding2])[0][0]   


def tratamento_candidato(df_candidato):
    df_candidato_tratado= df_candidato

        # Processamento do salário mínimo com conversão para float
    def parse_salary(salary_str):
        # Remove espaços, substitui vírgula por ponto e converte para float
        try:
            return float(salary_str.replace(',', '.').replace(' ', ''))
        except (ValueError, AttributeError):
            return 0.0  # Retorna 0 se houver erro na conversão

    df_candidato_tratado["formacao"] = df_candidato['candidateStudies'].apply(lambda lista: ' '.join(skill['Study']['education'] for skill in lista) if lista else '')
    df_candidato_tratado["idioma"] = df_candidato['candidateLanguages'].apply(
        lambda lista: ' '.join(f"{lang['Language']['course_name']} {lang['level']}" for lang in lista) if lista else ''
    )

    #df_candidato_tratado["area_profissional"] = df_candidato['candidateStudies'].apply(lambda lista: ' '.join(candidate_study['course_name'] for candidate_study in lista) if lista else '')
    df_candidato_tratado["cargo"] = df_candidato["candidateObjectives"].apply(lambda x: x[0]['job'] if len(x) > 0 else '')
    df_candidato_tratado["salario_min"] = df_candidato["candidateObjectives"].apply(
        lambda x: parse_salary(x[0]['salary_expectation']) if len(x) > 0 else 0.0
    )
    df_candidato_tratado["area_profissional"] = df_candidato["candidateObjectives"].apply(lambda x: x[0]['professional_area'] if len(x) > 0 else '')
    df_candidato_tratado['cidade'] = df_candidato["address"].str.split(',').str[1].str.replace(' - ', ' ', regex=True).str.strip()

    return(df_candidato_tratado)

def tratamento_vagas(df_vaga):
   
    df_vaga_tratada = df_vaga
    df_vaga_tratada['localizacao'] = df_vaga['city'].str.cat(vagas['state'], sep=' ', na_rep='não informado')
    df_vaga_tratada['area_profissional'] = df_vaga['vacancyExperience'].apply(lambda x: x[0]['Experience']['title'] if len(x) > 0 else '')
    df_vaga_tratada['escolaridade_min'] = df_vaga['vacancyStudy'].apply(lambda x: x[0]['Study']['education'] if len(x) > 0 else '')

    #vagas['habilidades1'] = vagas['vacancySkill'].apply(lambda lista: ' '.join(skill['Skill']['text'] for skill in lista) if lista else '')
    df_vaga_tratada['salary_max'].fillna(value=0, inplace=True)
    df_vaga_tratada['salary'] = df_vaga['salary'].apply(lambda x: 0 if x == 'Salário a combinar' else x)
    df_vaga_tratada[['salary', 'salary_max']]= df_vaga_tratada[['salary', 'salary_max']].astype(float)
    #np.where((df_vaga_tratada['salary'] > 0) & (df_vaga_tratada['salary_max'] == 0),df_vaga_tratada['salary'] + 100,df_vaga_tratada['salary_max'])
    df_vaga_tratada['salario_max'] = df_vaga_tratada.get('salary_max', 0)
    df_vaga_tratada['salario_max'] = np.where((df_vaga_tratada['salary'] > 0) & (df_vaga_tratada['salary_max'] == 0),df_vaga_tratada['salary'] + 100,df_vaga_tratada['salary_max'])
    df_vaga_tratada['idioma'] = vagas['vacancyLanguage'].apply(
        lambda lista: ' '.join(f"{lang['Language']['course_name']} {lang['level']}" for lang in lista) if lista else ''
    )

    return df_vaga_tratada


def embedding(df_cand_tratado, df_vagas_tratado, model):
    # Seleciona somente as colunas desejadas
    cand_col = ['candidate_id','cargo', 'salario_min', 'formacao','cidade', 'area_profissional', 'idioma']
    vaga_col = ['vacancy_id','title', 'salario_max', 'escolaridade_min', 'localizacao','area_profissional', 'idioma' ]

    df_vagas = df_vagas_tratado[vaga_col]
    df_cand = df_cand_tratado[cand_col]

    # Aplicar embeddings nas colunas de interesse
    df_vagas['titulo_embedding'] = df_vagas['title'].apply(lambda x: get_text_embedding(x, model))
    df_vagas['area_embedding'] = df_vagas['area_profissional'].apply(lambda x: get_text_embedding(str(x), model))
    df_vagas['formacao_embedding'] = df_vagas['escolaridade_min'].apply(lambda x: get_text_embedding(str(x), model))
    df_vagas['idioma_embedding'] = df_vagas['idioma'].apply(lambda x: get_text_embedding(str(x), model))
    
    #df_vagas['habilidade_embedding'] = df_vagas['habilidades'].apply(lambda x: get_text_embedding(str(x), word2vec_model))
    #df_cand['habilidade_embedding'] = df_cand['habilidade'].apply(lambda x: get_text_embedding(str(x), word2vec_model))

    df_cand['titulo_embedding'] = df_cand['cargo'].apply(lambda x: get_text_embedding(x, model))
    df_cand['area_embedding'] = df_cand['area_profissional'].apply(lambda x: get_text_embedding(x, model))
    df_cand['formacao_embedding'] = df_cand['formacao'].apply(lambda x: get_text_embedding(x, model))
    df_cand['idioma_embedding'] = df_cand['idioma'].apply(lambda x: get_text_embedding(x, model))
        
    #cand_habilidade_embedding = df_cand['habilidade_embedding'].iloc[num_cand]

    return df_cand, df_vagas

def calculo_cos_sim(df_embedding_candidato, df_embedding_vaga):
    df_sim_vaga_cand = df_embedding_vaga
    
    df_sim_vaga_cand['sim_salario'] = df_embedding_vaga['salario_max'].apply(lambda x: sim_salario(df_embedding_candidato['salario_min'], x))
    df_sim_vaga_cand['sim_localizacao'] = df_embedding_vaga['localizacao'].apply(lambda x: sim_local(df_embedding_candidato['cidade'][0], x))
    df_sim_vaga_cand['sim_titulo'] = df_embedding_vaga['titulo_embedding'].apply(lambda vaga_emb: cosine_similarity_embeddings(df_embedding_candidato['titulo_embedding'][0], vaga_emb))
    #df_vagas['sim_habilidade'] = df_vagas['habilidade_embedding'].apply(lambda vaga_emb: cosine_similarity_embeddings(cand_habilidade_embedding, vaga_emb))
    df_sim_vaga_cand['sim_area'] = df_embedding_vaga['area_embedding'].apply(lambda vaga_emb: cosine_similarity_embeddings(df_embedding_candidato['area_embedding'][0], vaga_emb))
 
    df_sim_vaga_cand['sim_formacao'] = df_embedding_vaga['formacao_embedding'].apply(lambda vaga_emb: cosine_similarity_embeddings(df_embedding_candidato['formacao_embedding'][0], vaga_emb))
    df_sim_vaga_cand['sim_idioma'] = df_embedding_vaga['idioma_embedding'].apply(lambda vaga_emb: cosine_similarity_embeddings(df_embedding_candidato['idioma_embedding'][0], vaga_emb))

    return df_sim_vaga_cand

def calculo_score(df, pesos, corte):
    df['score'] = 0

    # Multiplicando cada coluna pelo peso correspondente e somando os resultados
    for item in pesos:
        df['score'] += df[item['var']] * item['peso']

    df_ordenado = df.sort_values(by='score', ascending=False)
    logging.info(df_ordenado['score'])


    return df_ordenado[df_ordenado['score'] >= corte]


def recomendar(candidato, vagas, modelo):

    candidato_tratado, vagas_tratado = tratamento_candidato(candidato), tratamento_vagas(vagas)

    candidato_embedding, vagas_embedding = embedding(candidato_tratado, vagas_tratado, modelo)

    cand_vagas_similaridade = calculo_cos_sim(candidato_embedding, vagas_embedding)
    
    pesos = [
         {"var": "sim_salario", "peso": 0.05}, 
         {"var": "sim_localizacao", "peso": 0.1}, 
         {"var": "sim_titulo", "peso": 0.4}, 
         {"var": "sim_area", "peso": 0.6},
         #{"var": "sim_habilidade", "peso": 0.05},
         {"var": "sim_idioma", "peso": 0.1},
         {"var": "sim_formacao", "peso": 0.1}
    ]
    
    
    rec = calculo_score(cand_vagas_similaridade, pesos, 0.5)
    

    rec_json = [{
        'id_vaga': rec['vacancy_id'].iloc[i],  # Use .iloc para acessar a posição
        'id_candidato': candidato['candidate_id'][0],
        'score': rec['score'].iloc[i]  # Use .iloc para acessar a posição
    } 
    for i in range(len(rec))]

    return json.dumps(rec_json, ensure_ascii=True, indent=4)

################################ INICIO 
# Lê os caminhos dos arquivos JSON
candidate_file_path = sys.argv[1]
vacancies_file_path = sys.argv[2]

# Carrega dados em DataFrames
with open(candidate_file_path, 'r') as candidate_file:
    candidato = pd.DataFrame([json.load(candidate_file)])

with open(vacancies_file_path, 'r') as vacancies_file:
    vagas = pd.DataFrame(json.load(vacancies_file))

# Pega a base de dados e tranforma em um dataframe
#candidato = pd.read_json('/code/backend/src/database/pyscripts/modelos/CandidatoCorrigido.json')
#vagas = pd.read_json('/code/backend/src/database/pyscripts/modelos/Vagas.json')

# Carrega modelo
#word2vec_model = KeyedVectors.load_word2vec_format('/code/backend/src/database/pyscripts/modelos/glove_s50.txt')

recomedacao = recomendar(candidato, vagas, word2vec_model)

print(recomedacao)
