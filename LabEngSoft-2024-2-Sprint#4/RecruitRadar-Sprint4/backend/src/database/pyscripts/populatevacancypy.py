from bs4 import BeautifulSoup
import requests
import json
import base64
import pandas as pd
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
from time import sleep
import re
import logging
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

# Clica no botão aceitar cookies se ele estiver presente
def aceitar_cookies(element_id):
    try:
        # Aguardar o botão até que esteja clicável por no máximo 10 segundos
        btn_close_cookies = WebDriverWait(navegador, 10).until(
            EC.element_to_be_clickable((By.ID, element_id))
        )
        btn_close_cookies.click()
        logging.info("Botão de cookies encontrado e clicado.")
    except TimeoutException:
        logging.info("Botão de cookies não apareceu em tempo hábil.")
    except NoSuchElementException:
        logging.info("Botão de cookies não encontrado na página.")

def clicar_estado(estado):
    navegador.find_element(By.ID,'city').clear()
    sleep(2)
    input_place = navegador.find_element(By.ID,'city')
    input_place.send_keys(estado)
    sleep(3)
    
    hoverable = navegador.find_elements(By.CLASS_NAME, "autocomplete-suggestion")[-1]
    ActionChains(navegador).move_to_element(hoverable).perform()
    sleep(2)
    clickable = navegador.find_element(By.CSS_SELECTOR, 'div[class*="autocomplete-selected"]')
    ActionChains(navegador).click(clickable).perform()

    # Encontra e clica no botão "Achar vaga" usando JavaScript para evitar sobreposição
    s1 = "body > main > div.home-index-bg > section > div.job-location-filter > div.job-location-filter-btn > a"
    btn_achar_vaga = WebDriverWait(navegador, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, s1)))
    
    # Realiza o clique com JavaScript para evitar sobreposição
    navegador.execute_script("arguments[0].click();", btn_achar_vaga)
    logging.info("Botão 'Achar vaga' clicado com JavaScript.")

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
        logging.info(f"Erro ao acessar detalhes da vaga: {url}")

def format_text(text):
    text = text.replace('\r\n', '').strip()  # Remove quebras de linha
    text = ' '.join(text.split())  # Remove espaços extras
    return text

def chrome_opcoes():#'https://www.infojobs.com.br/'
    chrome_options = Options()
    chrome_options.add_experimental_option("detach", True) #necessario para navegador não abrir e fechar automaticamente
    
    #### Configuraçoes que tive que fazer para rodar direito no modo headless na minha maquina ###########
    chrome_options.add_argument('--headless')
    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36'
    chrome_options.add_argument(f'user-agent={user_agent}')    
    chrome_options.add_argument("--no-sandbox")  # Necessário para contêineres
    chrome_options.add_argument("--disable-dev-shm-usage")  # Evita problemas com o uso de /dev/shm
    chrome_options.add_argument("--disable-gpu")  # Desabilita o uso de GPU
    chrome_options.add_argument("--window-size=1920x1080")  # Define o tamanho da janela (opcional)
    chrome_options.add_argument("--remote-debugging-port=9222")  # Porta de depuração remota
    chrome_options.add_experimental_option("prefs", {
        "profile.default_content_setting_values.geolocation": 2  # Bloquear solicitações de localização
    })
    chrome_options.binary_location = "/usr/bin/chromium"  # Caminho do Chrome
    #####################################################################################################
 
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)

    #servico = Service(ChromeDriverManager().install())#para realizar uma atualização do chrome driver para acompanhar a versao do Chrome
    # Caminho para o ChromeDriver manualmente
    driver_path = '/usr/bin/chromedriver'

    servico = Service(driver_path)
    return webdriver.Chrome(service=servico, options=chrome_options)

def image_base64(url):
    
    response = requests.get(url,timeout=10)
    
    if response.status_code == 200:
        # Converte o conteúdo da imagem para base64

        image_base64 = base64.b64encode(response.content).decode('utf-8')

        return image_base64
    else:
        return "Sem logo"

def idioma(lista):
    x =[]
    if lista != [] and ';' not in lista[0]:
        for s in lista:
            x.append({'language': s.split()[0], 'nivel': re.findall(r'\(([^]]+)\)', s)[0]})
        return x
    else:
        return []

# TODO: validar adição de mais estados
# estados = ['sao paulo', 'rio de janeiro', 'minas gerais', 'bahia', 'distrito federal', 'santa catarina', 'Paraná', 'rio grande do sul']
estados = ['sao paulo']

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

        if detalhes_soup is None:
            #logging.info('Não foi possível pegar o HTML :/')
            continue 
        
        titulo_element = detalhes_soup.find('h2', class_="js_vacancyHeaderTitle")
        titulo = titulo_element.text.strip() if titulo_element else 'Título não disponível'

        empresa_element = detalhes_soup.find('div', class_='h4').find('a')
        empresa = empresa_element.text.strip() if empresa_element else 'Empresa confidencial'

        descricao_element = detalhes_soup.findAll('p')
        descricao = format_text(descricao_element[0].text.strip()) if descricao_element else 'Descrição não disponível'

        # Extrai o logo da empresa se houver
        logo_element = detalhes_soup.find('div', class_="ml-16 js_applyVacancyHidden js_visibleWhileKillers").find('img')
        if logo_element:
            logo_empresa = image_base64(logo_element['src'])
        else:
            logo_empresa = "Sem logo"
        
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
            'logo_empresa': logo_empresa,
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

#Elimina linhas duplicadas
df_vagas = df.iloc[df.astype(str).drop_duplicates(ignore_index=True).index]

#Separa cidade e sigla do estado da variavel local_da_empresa e cria duas colunas para cada 
df_vagas[['cidade_empresa', 'estado_empresa']] = df_vagas['local_da_empresa'].str.split(' - ', expand=True)
#Existem casos em que cidade está como todo Brasil
df_vagas['estado_empresa'] = df_vagas.apply(lambda x: x['cidade_empresa'] if x['estado_empresa'] is None else x['estado_empresa'], axis=1)

# Cria colunas tipo_contrato e periodo_contrato a partir de tipo_de_contrato 
df_vagas[['tipo_contrato','periodo_contrato']] = df_vagas['tipo_de_contrato'].str.split(r'[-]+', expand=True)

# Quebra faixa salarial em duas colunas: salario_min e salario_max
salario = df_vagas['faixa_salarial'].str.split(r'[\s]+', expand=True)
salario = salario.fillna(value={"1": 0, "4": 0})
salario.drop([0,2,3,5,6], axis=1, inplace=True)

df_vagas['salario_max'], df_vagas['salario_min']= salario[4].str.replace('.', '').str.replace(',', '.'), salario[1].str.replace('.', '').str.replace(',', '.').str.replace('a', 'Salário a combinar')

#Modelo de trabalho
df_vagas['modelo_trabalho'] = df_vagas['modelo_de_trabalho'].apply(lambda x : x if 'PcD' not in x else x.split()[-1] )
df_vagas['pcd'] = df_vagas['modelo_de_trabalho'].apply(lambda x : 1 if 'PcD' in x else 0)

# Habilidades não são modificadas
# df_vagas['habilidades'] = df_vagas['habilidades'].apply(lambda lista: [s.upper() for s in lista])

# Extrai de exigências escolaridade mínima 
escolaridade = df_vagas['exigencias'].apply(lambda x: x[0])

try:
    df_vagas['escolaridade_min'] = escolaridade.apply(lambda s: s.split(':')[1] if ('Escolaridade Mínima' in s)  else 'Não informado')
except:
    df_vagas['escolaridade_min'] = 'Não informado'

#Extrair idiomas
idiomas = df_vagas['exigencias'].apply(lambda x: x[1:])
try:
    df_vagas['idioma'] = idiomas.apply(lambda lista: idioma(lista)) 
except:
    idiomas = df_vagas['valorizado'].apply(lambda x: x[1:])
    try:
        df_vagas['idioma'] = idiomas.apply(lambda lista: idioma(lista)) 
    except:
        df_vagas['idioma'] = [['Não informado'] for _ in range(len(df_vagas))]


# Valorizado tiramos experiência desejada
df_vagas['experiencia_desejada'] = df_vagas['valorizado'].apply(lambda s: s[0].split(':')[1] if ('Experiência desejada' in s[0]) else 'Não informado')

colunas = ['local_da_empresa', 'tipo_de_contrato', 'faixa_salarial','exigencias', 'valorizado']
df_vagas.drop(colunas, axis=1, inplace=True)

# Converte o DataFrame para JSON com suporte completo para caracteres não ASCII
json_string = df_vagas.to_json(orient='records', force_ascii=True, indent=4)

# Remove barras invertidas do campo base64 das imagens
json_string = json_string.replace('\\/', '/')

# Exibe o JSON final
print(json_string)