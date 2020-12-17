# dataproject-sqlalchemy

## Objectives
- Create script for creating and deleting database and role
- Design a schema based on CSV data.
- Extract data from CSV and store them in database using SQLAlchemy
- Using SQLAlschemy code to generate json files
- Plot graph from json files.

## Data
- I've already uploaded the dataset in project for umpire dataset.
- for other database you can go to :- https://www.kaggle.com/manasgarg/ipl/version/5
- move the downloaded files to data folder.

## Requirement
- Postgres
- SQLAlchemy
- install all the requirements by `pip3 install -r requirements.txt`

## Steps
- At first run `\i createdb.sql` in postgres
- Then run `python3 setup,py`
- all json files will be generated in assets folder.
- Run a localhost to see the graphs `python3 -m http.server`
- Now go to http://0.0.0.0:8000/