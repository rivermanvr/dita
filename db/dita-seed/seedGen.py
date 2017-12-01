#!/usr/bin/env python

import json
from pprint import pprint
from random import randint
import random

#####################################
# locations (saves as locations.json)
#####################################
cities = json.load(open('cities.json'))
locations = []
main_locations = [
  { 'address': 'Saitama', 'lat': 36.0187669, 'lng': 139.0248439, 'isHome': True },
  { 'address': 'New Hyde Park', 'lat': 40.7326609, 'lng': -73.6948277, 'isHome': True },
  { 'address': 'Paterson', 'lat': 40.9151955, 'lng': -74.2028202, 'isHome': True },
  { 'address': 'West Orange', 'lat': 40.7920341, 'lng': -74.2980747, 'isHome': True }
]

for location in main_locations:
  locations.append(location)

for city in cities:
  city_data = {}
  city_data['address'] = city['name']
  city_data['lat'] = city['lat']
  city_data['lng'] = city['lng']
  city_data['isHome'] = 'true'  
  locations.append(city_data)

print 'locations', len(locations)
locations = locations[:5] + random.sample(locations[5:], 996)
    
with open('locations.json', 'w') as loc_fp:  
  json.dump(locations, loc_fp)


#################################
# users (saves as users.json)
#################################
names = json.load(open('first-names.json'))
users = []
power_users = [
  { 'name': 'kaz', 'email': 'kaz@dita.com', 'username': 'kaz', 'password': 'dita', 'profilePic':'https://usatftw.files.wordpress.com/2017/11/usp_nba__philadelphia_76ers_at_los_angeles_lakers_95365191-e1511314321431.jpg?w=1000&h=600&crop=1' },
  { 'name': 'wasif', 'email': 'wasif@dita.com', 'username': 'wasif', 'password': 'dita', 'profilePic':'https://imagesvc.timeincapp.com/v3/fan/image?url=https://thesixersense.com/wp-content/uploads/getty-images/2017/08/830248940-2017-nba-rookie-photo-shoot.jpg.jpg&' },
  { 'name': 'vince', 'email': 'vince@dita.com', 'username': 'vince', 'password': 'dita', 'profilePic':'http://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2017%2F0303%2Fr186814_1296x729_16%2D9.jpg' },
  { 'name': 'murray', 'email': 'murray@dita.com', 'username': 'murray', 'password': 'dita', 'profilePic':'https://img.bleacherreport.net/img/images/photos/003/706/425/d41845ec2e5fbd547a2be9b4be9d8e34_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top' }
]

for user in power_users:
  users.append(user)

for name in names:
  user_data = {}
  user_name = name.lower()
  if ' ' in user_name: 
    splitted = user_name.split(' ')
    user_name = '_'.join(splitted)
  user_data['name'] = name
  user_data['email'] = user_name + '@dita.com'
  user_data['username'] = user_name
  user_data['password'] = 'dita'
  user_data['profilePic'] = 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png'  
  users.append(user_data)

print 'users', len(users)
users = users[:5] + random.sample(users[5:], 996)

with open('users.json', 'w') as users_fp:
  json.dump(users[:1000], users_fp)


#################################
# stories (saves as stories.json)
#################################
quotes = json.load(open('quotes.json'))
stories = []

for quote in quotes[1:]:
  story_data = {}
  title = quote['quote'].split('.')[0]
  if len(title) < 100:
    story_data['title'] = title
  else:
    story_data['title'] = 'Title'
  story_data['description'] = 'Description'
  story_data['userId'] = randint(0, 1000)
  stories.append(story_data)
 
print 'stories', len(stories)

with open('stories.json', 'w') as stories_fp:
  json.dump(stories, stories_fp)


#################################
# posts (saves as posts.json)
#################################
sentences = json.load(open('sentences.json'))
posts = []
latitudes = [ i['lat'] for i in locations]
longitudes = [ i['lng'] for i in locations]

for sentence in sentences:
  post_data = {}
  userId = 0
  storyId = 0
  words = sentence.split(' ')

  for word in words:
    if len(word) > 4:  
      post_data['title'] = word.split('.')[0]
    else:
      post_data['title'] = 'Title'

  post_data['body'] = sentence[:500] 
  post_data['latitude'] = random.choice(latitudes[5:])
  post_data['longitude'] = random.choice(longitudes[5:])
  post_data['userId'] = randint(5, 1000)
  post_data['storyId'] = randint(0, 37) 
  posts.append(post_data)

print 'posts', len(posts)
random.sample(posts, 1000)

with open('posts.json', 'w') as posts_fp:
  json.dump(posts[:1000], posts_fp)



#################################
# replies (saves as replies.json)
#################################
# replies = []
# for sentence in sentences[len(sentences/2):]:
#   reply_data = {}
#   reply_data['body'] = sentence
#   reply_data['userId'] = randint(0, 1000)
#   reply_data['postId'] = randint(0, 1000)
# replies.append(reply_data)

# with open('replies.json', 'w') as replies_fp:
#   json.dump(replies, replies_fp)




