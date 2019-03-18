import numpy as np
import pandas as pd
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['whatsnext']

ratings = mydb['ratings']
movies = mydb['movies']

ratings_data = pd.DataFrame(list(ratings.find()))
movie_names = pd.DataFrame(list(movies.find()))

movie_data = pd.merge(ratings_data, movie_names, on="movieId")
movie_data.groupby('title')['rating'].count().sort_values(ascending=False).head()

ratings_mean_count = pd.DataFrame(movie_data.groupby('title')['rating'].mean())  
ratings_mean_count['rating_counts'] = pd.DataFrame(movie_data.groupby('title')['rating'].count())  

user_movie_rating = movie_data.pivot_table(index='userId', columns='title', values='rating')
user_movie_rating.head()

forrest_gump_ratings = user_movie_rating['Forrest Gump (1994)']

forrest_gump_ratings.head()

movies_like_forrest_gump = user_movie_rating.corrwith(forrest_gump_ratings)

corr_forrest_gump = pd.DataFrame(movies_like_forrest_gump, columns=['Correlation'])
corr_forrest_gump.dropna(inplace=True)
corr_forrest_gump.head()

corr_forrest_gump.sort_values('Correlation', ascending=False).head(10)

corr_forrest_gump = corr_forrest_gump.join(ratings_mean_count['rating_counts'])
corr_forrest_gump.head()

print(corr_forrest_gump[corr_forrest_gump ['rating_counts'] > 50].sort_values('Correlation', ascending=False).head())