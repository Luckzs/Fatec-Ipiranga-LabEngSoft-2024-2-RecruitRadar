from bs4 import BeautifulSoup
import requests
import json
import pandas as pd
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from time import sleep
import re

# Clica no botão aceitar cookies
def aceitar_cookies(element_id):
    btn_close_cookies = navegador.find_element(By.ID, element_id)
    btn_close_cookies.click()

def clicar_estado(estado):
    navegador.find_element(By.ID,'city').clear()
    sleep(2)
    input_place = navegador.find_element(By.ID,'city')
    input_place.send_keys(estado)
    sleep(2)
    
    hoverable = navegador.find_elements(By.CLASS_NAME, "autocomplete-suggestion")[-1]
    ActionChains(navegador).move_to_element(hoverable).perform()

    clickable = navegador.find_element(By.CSS_SELECTOR, 'div[class*="autocomplete-selected"]')
    ActionChains(navegador).click(clickable).perform()

    # Clica botão achar vaga
    s1 = "body > main > div.home-index-bg > section > div.job-location-filter > div.job-location-filter-btn > a"
    btn_achar_vaga = navegador.find_element(By.CSS_SELECTOR, s1)
    btn_achar_vaga.click()

def scroll(driver, qtd_scroll):
    i = 0
    while i <= qtd_scroll:
        driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
        sleep(5)
        i += 1

def vagas_lista(referencia_css_selector):
    vagas_link = []
    links = navegador.find_elements(By.CSS_SELECTOR, referencia_css_selector)
    for link in links:
        vagas_link.append(link.get_attribute('href'))
    return vagas_link

def verifica_elemento(html_content, elemento):
    exigencias_section = html_content.find('div', class_='h4 font-weight-bold text-body mb-12', string=lambda t: elemento in t)
    if exigencias_section:
        ul_element = exigencias_section.find_next('ul')
        return [li.text.strip() for li in ul_element.find_all('li')] if ul_element else [elemento + ' não identificadas']
    else:
        return [elemento + ' não identificadas']

def requisicao_http(url):
    try:
        response = requests.get(url)
        return BeautifulSoup(response.text, 'html.parser')
    except:
        print(f"Erro ao acessar detalhes da vaga: {url}")

def format_text(text):
    text = text.replace('\r\n', '').strip()  # Remove quebras de linha
    text = ' '.join(text.split())  # Remove espaços extras
    return text

def chrome_opcoes():
    chrome_options = Options()
    chrome_options.add_experimental_option("detach", True) # Necessário para navegador não abrir e fechar automaticamente
    chrome_options.add_argument('--incognito')
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)

    servico = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=servico, options=chrome_options)

def extrair_idioma(valor):
    if isinstance(valor, str) and '(' in valor and ')' in valor:
        return valor
    return 'Não informado'

#estados = ['sao paulo', 'rio de janeiro', 'minas gerais', 'bahia', 'distrito federal', 'santa catarina', 'Paraná', 'rio grande do sul']
estados = ['bahia']
vagas = []

for estado in estados:
    navegador = chrome_opcoes()
    navegador.implicitly_wait(15)
    try:
        navegador.get('https://www.infojobs.com.br/')
    except:
        continue
    
    aceitar_cookies("didomi-notice-agree-button")
    clicar_estado(estado)
    scroll(navegador, 0)
    
    link_das_vagas = vagas_lista("a[class='text-decoration-none']")
    navegador.quit()

    for url in link_das_vagas:
        vaga_id = re.findall('[0-9]+', url)[0]
        vaga_href = url
      
        detalhes_soup = requisicao_http(url)
        if not detalhes_soup:
            continue
        
        titulo_element = detalhes_soup.find('h2', class_="js_vacancyHeaderTitle")
        titulo = titulo_element.text.strip() if titulo_element else 'Título não disponível'

        empresa_element = detalhes_soup.find('div', class_='h4').find('a')
        empresa = empresa_element.text.strip() if empresa_element else 'Empresa confidencial'

        descricao_element = detalhes_soup.findAll('p')
        descricao = format_text(descricao_element[0].text.strip()) if descricao_element else 'Descrição não disponível'

        divs = detalhes_soup.find_all('div', class_='text-medium mb-4')
        local = divs[0].contents[0].strip() if len(divs) > 0 else 'Local não identificado'
        faixa_salarial = divs[1].contents[0].strip() if len(divs) > 1 else 'Faixa salarial não informada'
        faixa_salarial = format_text(faixa_salarial)

        modelo_element = detalhes_soup.find('div', class_='text-medium small font-weight-bold mb-4')
        modelo = modelo_element.text.strip() if modelo_element else 'Modelo de trabalho não identificado'


        area_element = detalhes_soup.find('span', string='Área Profissional:')
        area = area_element.find_next_sibling(string=True).strip() if area_element else 'Área Profissional não identificado'

        contrato_element = detalhes_soup.find('span', string='Tipo de contrato e Jornada:')
        contrato = contrato_element.find_next_sibling(string=True).strip() if contrato_element else 'Tipo de contrato de trabalho não identificado'

        exigencias = verifica_elemento(detalhes_soup, 'Exigências')
        valorizado = verifica_elemento(detalhes_soup, 'Valorizado')
        beneficios = verifica_elemento(detalhes_soup, 'Beneficios')

        habilidades_element = detalhes_soup.find_all('div', class_='tag mr-8 mb-8 tag-outline-primary tag-lg')
        habilidades = [habilidade.find('span').text.strip() for habilidade in habilidades_element] if habilidades_element else ['Habilidades não identificadas']

        vagas.append({
            'id_da_vaga': vaga_id,
            'titulo_da_vaga': titulo,
            'nome_da_empresa': empresa,
            'local_da_empresa': local,
            'modelo_de_trabalho': modelo,
            'area_profissional': area,
            'tipo_de_contrato': contrato,
            'faixa_salarial': faixa_salarial,
            'descricao_da_vaga': descricao,
            'exigencias': exigencias,
            'valorizado': valorizado,
            'beneficios': beneficios,
            'habilidades': habilidades,
            'url_da_vaga': vaga_href
        })

# Converte a lista de vagas para JSON como string
vagas_json = json.dumps(vagas, ensure_ascii=False, indent=4)

# Lê a string JSON no DataFrame do pandas
df = pd.read_json(vagas_json)

# Separa cidade e sigla do estado da variável local_da_empresa e cria duas colunas para cada 
df[['cidade_empresa', 'estado_empresa']] = df['local_da_empresa'].str.split('-', expand=True)
df_vagas = df.drop('local_da_empresa', axis=1)

# Cria colunas tipo_contrato e periodo_contrato a partir de tipo_de_contrato 
df_vagas[['tipo_contrato','periodo_contrato']] = df_vagas['tipo_de_contrato'].str.split(r'[-]+', expand=True)
df_vagas.drop('tipo_de_contrato', axis=1, inplace=True)

# Quebra faixa salarial em duas colunas: salario_min e salario_max
aux = df['faixa_salarial'].str.split(r'[\s]+', expand=True)
aux.drop([0,2,3,5,6], axis=1, inplace=True)
aux = aux.fillna(value='0')
df_vagas['salario_max'], df_vagas['salario_min'] = aux[4].str.replace('.', '').str.replace(',', '.'), aux[1].str.replace('.', '').str.replace(',', '.').str.replace('a', '0')
df_vagas.drop('faixa_salarial', axis=1, inplace=True)

# Habilidades não são modificadas
# df_vagas['habilidades'] = df_vagas['habilidades'].apply(lambda lista: [s.upper() for s in lista])

# Extrai de exigências escolaridade mínima e idiomas
df_exig = pd.DataFrame(df_vagas['exigencias'].to_list())
df_val = pd.DataFrame(df_vagas['valorizado'].to_list())

# Adiciona verificação para a existência das colunas
if 0 in df_exig.columns:
    df_vagas['escolaridade_min'] = df_exig[0].str.split(':').str[1].fillna('Não informado')
else:
    df_vagas['escolaridade_min'] = 'Não informado'

# Verifica se a coluna 1 existe em df_exig
if 1 in df_exig.columns:
    df_vagas['idioma'] = df_exig[1].apply(extrair_idioma)
# Se não existir em df_exig, verifica se a coluna 1 existe em df_val
elif 1 in df_val.columns:
    df_vagas['idioma'] = df_val[1].apply(extrair_idioma)
# Se não houver a coluna 1 em nenhuma das tabelas, preenche com "Não informado" ou uma lista vazia
else:
    df_vagas['idioma'] = ['Não informado' for _ in range(len(df_vagas))]


df_vagas.drop('exigencias', axis=1, inplace=True)

# Valorizado tiramos experiência desejada
df_vagas['experiencia_desejada'] = df_vagas['valorizado'].apply(lambda s: s[0].split(':')[1] if ('Experiência desejada' in s[0]) else 'Não informado')



df_vagas.drop('valorizado', axis=1, inplace=True)

# Converte o DataFrame para JSON com suporte completo para caracteres não ASCII
json_string = df_vagas.to_json(orient='records', force_ascii=True, indent=4)
print(json_string)
