import datetime
text = help(datetime)
message = open('415-pydoc-completed.txt','w')
message.write(text)
message.close()
