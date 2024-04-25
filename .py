from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests
import os

# # Set up Selenium WebDriver (adjust this based on your browser and driver location)
# driver = webdriver.Chrome()  # Or use appropriate webdriver for your browser

# # Load the webpage containing lazy-loaded images
# url = "https://attackontitan.fandom.com/wiki/List_of_characters/Anime"  # Replace this with your webpage URL
# driver.get(url)

# # Wait for lazy-loaded images to appear (adjust timeout as needed)
# timeout = 10  # Maximum time to wait for images to load in seconds
# try:
#     # Wait until at least one lazy-loaded image is found
#     WebDriverWait(driver, timeout).until(
#         EC.presence_of_element_located((By.CLASS_NAME, "lazyload"))
#     )

#     # Once images are loaded, retrieve the page source
#     html_content = driver.page_source

#     # Parse the HTML content using BeautifulSoup
#     soup = BeautifulSoup(html_content, 'html.parser')

#     # Find all <img> tags with class "lazyload"
#     images = soup.find_all('img', class_='lazyload')

#     # Extract image URLs from the data-src attribute
#     image_urls = [img['data-src'] for img in images if 'data-src' in img.attrs]
#     names = []
#     whitelist = ["Armin Arlelt","Mikasa Ackermann","Jean Kirschtein","Conny Springer","Levi Ackermann","Hange Zoë","Sasha Braus","Erwin Smith","Hitch Dreyse","Kenny Ackermann","Dot Pyxis","Marco Bodt","Theo Magath","Reiner Braun","Annie Leonhart","Pieck Finger","Falco Grice","Gabi Braun","Porco Galliard","Colt Grice","Bertholdt Hoover","Marcel Galliard","Tom Xaver","Eren Kruger","Historia Reiss","Frieda Reiss","Fritz","Ymir Fritz","King Fritz","Grisha Jaeger","Ymir","Yelena","Onyankopon","Zeke Jaeger","Eren Jaeger"]
#     # Display the extracted image URLs
#     for url in image_urls:
#         names.append(url.split("/")[7].split("%")[0].replace("_", " ").lower())


# finally:
#     # Quit the WebDriver session
#     driver.quit()

# for i in range(len(names)):
#     r = requests.get(image_urls[i])
#     with open(f"src/assets/characters/{names[i].replace(' ', '_')[0:-1]}.jpg", "wb") as file:
#         file.write(r.content)

# files = []
white = []
whitelist = ["Armin Arlelt","Mikasa Ackermann","Jean Kirschtein","Conny Springer","Levi Ackermann","Hange Zoë","Sasha Braus","Erwin Smith","Hitch Dreyse","Kenny Ackermann","Dot Pyxis","Marco Bodt","Theo Magath","Reiner Braun","Annie Leonhart","Pieck Finger","Falco Grice","Gabi Braun","Porco Galliard","Colt Grice","Bertholdt Hoover","Marcel Galliard","Tom Xaver","Eren Kruger","Historia Reiss","Frieda Reiss","Fritz","Ymir Fritz","King Fritz","Grisha Jaeger","Ymir","Yelena","Onyankopon","Zeke Jaeger","Eren Jaeger"]
[white.append(i.split(" ")[0].lower()) for i in whitelist]


for filename in os.listdir("src/assets/characters"):
    path = os.path.join("src/assets/characters", filename)
    if("_" in filename):
        name = filename.split("_")[0].lower()
        if name not in white:
            os.remove(path)
    else:
        name = filename.split(".")[0].lower()
        if name not in white:
            os.remove(path)