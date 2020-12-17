from sqlalchemy import create_engine
from sqlalchemy import func
from sqlalchemy.orm import sessionmaker
from schema import Base, Umpire, Deliveries, Matches
import csv
import json
from collections import defaultdict


engine = create_engine("postgresql://akshay:123456@localhost:5432/akshay")
Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)


def push_data():
    """
        push all the csv data to database tables
    """
    session = Session()

    # Adding data to Umpire Table
    file = open("./data/umpire_origin.csv")
    reader = csv.reader(file)
    data = list(reader)
    for chunk in data[1:]:
        session.add(
            Umpire(
                umpire=chunk[0],
                country=chunk[1],
            )
        )

    # Adding data to deliveries table
    file = open("./data/deliveries.csv")
    reader = csv.reader(file)
    data = list(reader)
    for chunk in data[1:]:
        session.add(
            Deliveries(
                match_id=chunk[0],
                inning=chunk[1],
                batting_team=chunk[2],
                bowling_team=chunk[3],
                over=chunk[4],
                ball=chunk[5],
                batsman=chunk[6],
                non_striker=chunk[7],
                bowler=chunk[8],
                is_super_over=chunk[9],
                wide_runs=chunk[10],
                bye_runs=chunk[11],
                legbye_runs=chunk[12],
                noball_runs=chunk[13],
                penalty_runs=chunk[14],
                batsman_runs=chunk[15],
                extra_runs=chunk[16],
                total_runs=chunk[17],
                player_dismissed=chunk[18],
                dismissal_kind=chunk[19],
                fielder=chunk[20],
            )
        )

    # Adding data to Matches table
    file = open("./data/matches.csv")
    reader = csv.reader(file)
    data = list(reader)
    for chunk in data[1:]:
        session.add(
            Matches(
                season=chunk[1],
                city=chunk[2],
                date=chunk[3],
                team1=chunk[4],
                team2=chunk[5],
                toss_winner=chunk[6],
                toss_decision=chunk[7],
                result=chunk[8],
                dl_applied=chunk[9],
                winner=chunk[10],
                win_by_runs=chunk[11],
                win_by_wickets=chunk[12],
                player_of_match=chunk[13],
                venue=chunk[14],
                umpire1=chunk[15],
                umpire2=chunk[16],
                umpire3=chunk[17],
            )
        )
    session.commit()
    session.close()


def umpire_json():
    """
        Function for generating json file for origin of umpires
    """
    session = Session()
    umpire_data = (
        session.query(Umpire.country, func.count(Umpire.country))
        .group_by(Umpire.country)
        .filter(Umpire.country != "India")
        .all()
    )
    with open("jsons/umpire_origin.json", "w") as outfile:
        json.dump(dict(umpire_data), outfile)


def rcb_batsman():
    """
        Function for generating json for top 10 batsman of RCB
    """
    session = Session()
    top_batsman = (
        session.query(Deliveries.batsman, func.sum(Deliveries.batsman_runs))
        .group_by(Deliveries.batsman)
        .order_by(func.sum(Deliveries.batsman_runs).desc())
        .filter(Deliveries.batting_team == "Royal Challengers Bangalore")
        .limit(10)
    )

    with open("jsons/top_batsman.json", "w") as outfile:
        json.dump(dict(top_batsman), outfile)


def team_total():
    """
       Function for generating json for total runs scored by teams
    """
    session = Session()

    total_teams = session.query(
        Deliveries.batting_team, func.sum(Deliveries.total_runs)
    ).group_by(Deliveries.batting_team)

    with open("jsons/team_total.json", "w") as outfile:
        json.dump(dict(total_teams), outfile)


def team_season():
    """
        Function for generating json for number of
        matches played by teams each season
    """
    session = Session()

    season = [i[0] for i in session.query(Matches.season).distinct()]
    teams = [i[0] for i in session.query(Matches.team1).distinct()]

    team_1 = (
        session.query(Matches.team1, Matches.season, func.count(Matches.team1))
        .group_by(Matches.season, Matches.team1)
        .order_by(Matches.season, Matches.team1)
        .all()
    )
    team_2 = (
        session.query(Matches.team2, Matches.season, func.count(Matches.team2))
        .group_by(Matches.season, Matches.team2)
        .order_by(Matches.season, Matches.team2)
        .all()
    )

    data = defaultdict(dict)
    for i in season:
        data.update({i: {}})
    for index, value in enumerate(team_1):
        data[value[1]][value[0]] = value[2] + team_2[index][2]

    pro_data = defaultdict(list)
    for i in teams:
        for j in season:
            pro_data[i].append(data[j].get(i, 0))

    with open("jsons/stacked.json", "w") as outfile:
        json.dump(pro_data, outfile)


if __name__ == "__main__":
    push_data()
    umpire_json()
    rcb_batsman()
    team_total()
    team_season()
