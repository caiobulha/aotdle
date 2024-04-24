from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests

# Set up Selenium WebDriver (adjust this based on your browser and driver location)
driver = webdriver.Chrome()  # Or use appropriate webdriver for your browser

# Load the webpage containing lazy-loaded images
url = "https://attackontitan.fandom.com/wiki/List_of_characters/Anime"  # Replace this with your webpage URL
driver.get(url)

# Wait for lazy-loaded images to appear (adjust timeout as needed)
timeout = 10  # Maximum time to wait for images to load in seconds
try:
    # Wait until at least one lazy-loaded image is found
    WebDriverWait(driver, timeout).until(
        EC.presence_of_element_located((By.CLASS_NAME, "lazyload"))
    )

    # Once images are loaded, retrieve the page source
    html_content = driver.page_source

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find all <img> tags with class "lazyload"
    images = soup.find_all('img', class_='lazyload')

    # Extract image URLs from the data-src attribute
    image_urls = [img['data-src'] for img in images if 'data-src' in img.attrs]
    names = []

    # Display the extracted image URLs
    for url in image_urls:
        names.append(url.split("/")[7].split("%")[0].replace("_", " "))


finally:
    # Quit the WebDriver session
    driver.quit()

for i in range(len(names)):
    name = names[i].strip() + ".jpg"

    r = requests.get(image_urls[i])
    with open("src/assets/characters", "wb") as file:
        file.write(r.content)
