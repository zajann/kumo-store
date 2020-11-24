#! /usr/bin/env python3.6

import sqlite3
from urllib import parse
import csv

delete_sql = '''delete from tbl_store'''
insert_sql = '''insert into tbl_store(name, address, phone, lat, lng, web_link,
mobile_link, type) values (?, ?, ?, ?, ?, ?, ?, ?)'''


conn = sqlite3.connect('kumo.db')

cur = conn.cursor()

# 1. Truncate table
cur.execute(delete_sql)

# 2. Read CSV Data
f = open('./csv/kumo_store_200423.csv', 'r', encoding='utf-8')
rdr = csv.reader(f)

nmap = "nmap://search?query={0}&appname=kumostore.cafe24app.com/mobile"

# 3. Insert new data
for line in rdr:

    name = line[0]
    addr = line[1]
    phone = line[2]
    lat = float(line[3])
    lng = float(line[4])
    sType = int(line[5])
    weblink = line[6]
    enc_keyword = parse.quote(line[7])
    mobilelink = nmap.format(enc_keyword)

    active = int(line[8])

    if active == 1 :
        cur.execute(insert_sql, (name, addr, phone, lat, lng, weblink, mobilelink, sType))


conn.commit()
conn.close()
f.close()

