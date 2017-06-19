#!/usr/bin/python
# -*- coding: utf-8 -*-

MONTH = [
	u"كانون الثاني",
	u"شباط",
	u"آذار",
	u"نيسان",
	u"أيار",
	u"حزيران",
	u"تموز",
	u"آب",
	u"أيلول",
	u"تشرين الأول",
	u"تشرين الثاني",
	u"كانون الأول"
]

MONTH2 = [
	u"يناير",
	u"فبراير",
	u"مارس",
	u"أبريل",
	u"مايو",
	u"يونيو",
	u"يوليو",
	u"أغسطس",
	u"سبتمبر",
	u"أكتوبر",
	u"نوفمبر",
	u"ديسمبر"
]

import random, subprocess, time, sys

def spell(q):
	subprocess.Popen(["./spell.sh", q.encode("utf-8")],
					 stdout = subprocess.PIPE).wait()

t = 0
try:
	t = int(sys.argv[1])
except: pass

while True:
	day = random.randrange(1, 31)
	month = random.randrange(1, 12)
	year = random.randrange(1, 2050)

	month_names = random.choice((MONTH, MONTH2))
	spell(str(year))
	#spell(u"%s %s %s" % (day, month_names[month], year))

	time.sleep(t)
	print u"%s / %s / %s" % (day, month, year)



