#!/usr/bin/env python

"""
-------------------------------------------
Run tihs file as `python3 seedGen.py`.
This will generate locations.json, users.json,
posts.json, stories.json, and replies.json
with randomized data for seeding.
-------------------------------------------
"""

import json
from pprint import pprint
from random import randint
import random
import re


#####################################
# locations (saves as locations.json)
#####################################
cities = json.load(open('./some_random_json_i_found/cities.json'))
fh = open('./some_random_json_i_found/iso.csv').readlines()
country_list = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Croatia', 'Cuba', 'Czech Republic', 'Denmark', 'Ecuador', 'Egypt', 'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Ireland', 'Israel', 'Italy', 'Japan', '"Korea, Republic of"', 'Lebanon', 'Liechtenstein', 'Luxembourg', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Russian Federation', 'Singapore', 'South Africa', 'Spain', 'Sri Lanka', 'Switzerland', '"Taiwan, Province of China"', 'Thailand', 'Turkey', 'Ukraine', 'United Kingdom', 'United States', 'Viet Nam', '"Virgin Islands, British"', '"Virgin Islands, U.S."']
iso = [ line.split(',')[1][:2] for line in fh if line.split(',')[0] in country_list ]
locations = [
  { 'address': '5 Hanover Square, New York, NY', 'lat': 40.705076, 'lng': -74.009160, 'isHome': True },
  { 'address': 'New Hyde Park', 'lat': 40.7326609, 'lng': -73.6948277, 'isHome': True },
  { 'address': 'Paterson', 'lat': 40.9151955, 'lng': -74.2028202, 'isHome': True },
  { 'address': 'West Orange', 'lat': 40.7920341, 'lng': -74.2980747, 'isHome': True }
]

for city in cities:    
  if city['country'] in iso:
    city_data = {}
    city_data['address'] = city['name']
    city_data['lat'] = city['lat']
    city_data['lng'] = city['lng']
    city_data['isHome'] = 'true'  
    locations.append(city_data)

print('locations', len(locations))
locations = locations[:5] + random.sample(locations[5:], 996)

with open('locations.json', 'w') as loc_fp:  
  json.dump(locations, loc_fp)


#################################
# users (saves as users.json)
#################################
names = json.load(open('./some_random_json_i_found/first-names.json'))
enc='iso-8859-15'
fh = open('./some_random_json_i_found/famous_quotes.json', 'r', encoding=enc)
text = fh.read()
famous_quotes = json.loads(text)
quotes = []
unique_names = []
for q in famous_quotes:
  if q['quoteAuthor'] not in unique_names:
    unique_names.append(q['quoteAuthor'])
    quotes.append(q)

users = [
  { 'name': 'prof', 'email': 'eric@dita.com', 'username': 'prof', 'password': 'dita', 'profilePic':'https://usatftw.files.wordpress.com/2017/11/usp_nba__philadelphia_76ers_at_los_angeles_lakers_95365191-e1511314321431.jpg?w=1000&h=600&crop=1' },
  # { 'name': 'kaz', 'email': 'kaz@dita.com', 'username': 'kaz', 'password': 'dita', 'profilePic':'https://usatftw.files.wordpress.com/2017/11/usp_nba__philadelphia_76ers_at_los_angeles_lakers_95365191-e1511314321431.jpg?w=1000&h=600&crop=1' },
  { 'name': 'wasif', 'email': 'wasif@dita.com', 'username': 'wasif', 'password': 'dita', 'profilePic':'https://imagesvc.timeincapp.com/v3/fan/image?url=https://thesixersense.com/wp-content/uploads/getty-images/2017/08/830248940-2017-nba-rookie-photo-shoot.jpg.jpg&' },
  { 'name': 'vince', 'email': 'vince@dita.com', 'username': 'vince', 'password': 'dita', 'profilePic':'http://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2017%2F0303%2Fr186814_1296x729_16%2D9.jpg' },
  { 'name': 'murray', 'email': 'murray@dita.com', 'username': 'murray', 'password': 'dita', 'profilePic':'https://img.bleacherreport.net/img/images/photos/003/706/425/d41845ec2e5fbd547a2be9b4be9d8e34_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top' }
]

for quote in quotes:
  user_data = {}
  user_name = quote['quoteAuthor'].lower()
  user_name = ''.join(name for name in user_name if name.isalnum())[:14]

  if user_name and user_name != 'andrégide':    
    user_data['name'] = quote['quoteAuthor']
    user_data['email'] = user_name + '@dita.com'
    user_data['username'] = user_name
    user_data['password'] = 'dita'
    user_data['profilePic'] = 'https://d30y9cdsu7xlg0.cloudfront.net/png/1335729-200.png'  
    users.append(user_data)

print('users', len(users))

with open('users.json', 'w') as users_fp:
  json.dump(users, users_fp)



#################################
# stories (saves as stories.json)
#################################
books = json.load(open('./some_random_json_i_found/books.json'))
stories = [
  { 'title': 'Katy Perry', 'description': 'My times with Katy Perry' },
  { 'title': 'Coding (of course)', 'description': 'Story on crazy apps and products I\'m building' },
  { 'title': 'Advice', 'description': 'My advices for people' },
  { 'title': 'Pizza', 'description': 'My pizza-related stories' }
]

for book in books:
  story_data = {}
  story_data['title'] = book['title']
  story_data['description'] = book['title']
  story_data['userId'] = randint(5, 500)
  stories.append(story_data)

print('stories', len(stories))

with open('stories.json', 'w') as stories_fp:
  json.dump(stories, stories_fp)



#################################
# posts (saves as posts.json)
#################################
sentences = json.load(open('./some_random_json_i_found/sentences.json'))
posts = [
   { 'title': 'Dinner with Katy Perry', 'body': 'We ate Foo at Bar with Moe and Larry. Their Acme bread was great!', 'zip': '10004', 'latitude': 40.705076, 'longitude': -74.009160, 'halflife': 100 },
   { 'title': 'My JWT video on sale', 'body': 'And I have 2000 other videos on youtube. Also I write 500 tech blogs per day. And I do pull request at least 100 times a day. And no, I don\'t sleep.', 'zip': '11040', 'latitude': 40.7326609, 'longitude': -73.6948277, 'halflife': 100 },
   { 'title': 'I have advice for you', 'body': 'One - During an interview, don\'t freak out. Two - Keep your resume in one page. Three - Ask questions. Four - dress appropriately. [ ... post truncated because too long ... ] OK that\'s it. I\'m done. I\'ll stop talking.', 'zip': '07424', 'latitude': 40.9151955, 'longitude': -74.2028202, 'halflife': 100 },
   { 'title': 'Free Pizza \(^o^)/', 'body': 'I just got a job that pays $400k! I\'m buying everyone pizza!', 'zip': '07052', 'latitude': 40.7920341, 'longitude': -74.2980747, 'halflife': 100 },
]
latitudes = [ loc['lat'] for loc in locations ]
longitudes = [ loc['lng'] for loc in locations ]
titles = [ quote['quoteText'] for quote in famous_quotes if len(quote['quoteText']) < 70 ]

for sentence in sentences:
  sentence = re.sub(r'/[\d+]/g', '', sentence)
  if len(sentence) > 100:  
    post_data = {}
    post_data['title'] = random.choice(titles)
    post_data['body'] = sentence[:500] 
    post_data['latitude'] = random.choice(latitudes[5:])
    post_data['longitude'] = random.choice(longitudes[5:])
    post_data['userId'] = randint(5, 500)
    post_data['storylineId'] = randint(5, 100) 
    post_data['halflife'] = randint(1, 100)
    # post_data['visitedBy'] = [ random.choice(users) ]
    posts.append(post_data)

print('posts', len(posts))
posts = posts[:5] + random.sample(posts[6:], 100)

with open('posts.json', 'w') as posts_fp:
  json.dump(posts, posts_fp)



#################################
# replies (saves as replies.json) 
#################################
replies = [  
  { 'body': 'She is vegan? Damn! No pizza then.' },
  { 'body': 'Do you want advice on how to sell your bike and videos?' },
  { 'body': 'I need advice on how to become good friend with Katy Perry' },
  { 'body': 'I want pizza, but I\'m hikikomoring today. Can we have pizza party remotely?' }
]
for sentence in sentences:
  sentence = re.sub(r'/[\d+]/g', '', sentence)
  if len(sentence) < 100:
    reply_data = {}
    reply_data['body'] = sentence
    reply_data['userId'] = randint(5, 500)
    reply_data['postId'] = randint(5, 100)
    replies.append(reply_data)

print('replies', len(replies))
replies = replies[:5] + random.sample(replies[6:], 100)

with open('replies.json', 'w') as replies_fp:
  json.dump(replies, replies_fp)




