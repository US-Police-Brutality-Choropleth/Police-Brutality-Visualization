from bs4 import BeautifulSoup
import requests

#Get response from washington post police shootings database URL
url = 'https://www.washingtonpost.com/graphics/investigations/police-shootings-database/'
response = requests.get(url)

#Convert response into a beautifulsoup object and find header then number of killings
soup = BeautifulSoup(response.text,'lxml')
header = soup.find('h1',class_='introExplainer')
num_2020_killings = header.find('span').text

