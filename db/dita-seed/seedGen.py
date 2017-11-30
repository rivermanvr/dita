#!/usr/bin/env python

import json
from pprint import pprint

# locations (saves as locations.json)
cities = json.load(open('cities.json'))
locations = []
for city in cities:
  city_data = {}
  city_data['address'] = city['name']
  city_data['lat'] = city['lat']
  city_data['lng'] = city['lng']
  city_data['isHome'] = 'true'
  
  locations.append(city_data)

print 'locations', len(locations)
    
with open('locations.json', 'w') as loc_fp:
  json.dump(locations, loc_fp)


# users (saves as users.json)
names = json.load(open('first-names.json'))
users = []
power_users = [
  { 'name': 'vince', 'email': 'vince@rivcon.com', 'username': 'vince', 'password': 'dita', 'profilePic':'https://usatftw.files.wordpress.com/2017/11/usp_nba__philadelphia_76ers_at_los_angeles_lakers_95365191-e1511314321431.jpg?w=1000&h=600&crop=1' },
  { 'name': 'kaz', 'email': 'kaz@dita.net', 'username': 'kaz', 'password': 'dita', 'profilePic':'https://imagesvc.timeincapp.com/v3/fan/image?url=https://thesixersense.com/wp-content/uploads/getty-images/2017/08/830248940-2017-nba-rookie-photo-shoot.jpg.jpg&' },
  { 'name': 'wasif', 'email': 'wasif@dita.net', 'username': 'wasif', 'password': 'dita', 'profilePic':'http://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2017%2F0303%2Fr186814_1296x729_16%2D9.jpg' },
  { 'name': 'murray', 'email': 'murray@dita.net', 'username': 'murray', 'password': 'dita', 'profilePic':'https://img.bleacherreport.net/img/images/photos/003/706/425/d41845ec2e5fbd547a2be9b4be9d8e34_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top' }
]

for name in names:
  user_data = {}
  user_name = name[0].lower() + name[1:]
  user_data['name'] = name
  user_data['email'] = user_name + '@dita.com'
  user_data['username'] = user_name
  user_data['password'] = 'dita'
  user_data['profilePic'] = 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-256.png'
  
  users.append(power_users)
  users.append(user_data)

print 'users', len(users)

with open('users.json', 'w') as users_fp:
  json.dump(users, users_fp)


# posts (saves as posts.json)







