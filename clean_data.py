import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

pd.set_option('display.max_rows', None)
df = pd.read_csv('spotify-2023.csv')
df = df.dropna()
df['in_apple_playlists_categorical'] = pd.cut(df['in_apple_playlists'], bins=9, labels=['VERY_RARE', 'RARE', 'SOMEWHAT_RARE', 'COMMON', 'FAIRLY_POPULAR', 'POPULAR', 'HIGHLY_POPULAR', 'HIT', 'SUPER_HIT'], include_lowest=True)
df['in_spotify_playlists_categorical'] = pd.cut(df['in_spotify_playlists'], bins=9, labels=['VERY_RARE', 'RARE', 'SOMEWHAT_RARE', 'COMMON', 'FAIRLY_POPULAR', 'POPULAR', 'HIGHLY_POPULAR', 'HIT', 'SUPER_HIT'], include_lowest=True)
df['bpm_categorical'] = pd.cut(df['bpm'], bins=8, labels=['VERY_SLOW', 'SLOW', 'MODERATE_SLOW', 'MODERATE', 'MODERATE_FAST', 'FAST', 'VEREY_FAST', 'EXTREMELY_FAST'])

for i, row in df.iterrows():
    if row['released_year']==2023 or row['released_year']==2022 or row['released_year']==2021 or row['released_year']==2020 or row['released_year']==2019:
        df.at[i,'released_year_categorical'] = str(df.at[i,'released_year'])
    else :
        df.at[i, 'released_year_categorical'] = 'BEFORE_2019'

# One cell had rubbish data, replacing that data with similar data for now
df.at[574, 'streams']=df.at[573, 'streams']
df.to_csv('spotify_processed_data.csv', sep=',')