# message = open('318-message.txt','w')
# message.write('Testing file for player configuration\n')
# message.write('Testing file for player score\n')
# message.close()


with open('318-message.txt','w') as message:
    message.write('Testing file for player configuration\n')
    message.write('Testing file for player score\n')
    message.close()
    print("file created")