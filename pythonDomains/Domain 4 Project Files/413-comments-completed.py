game_state = True
game_lives = 1
#Prints positions achieved during lives
while game_lives <= 3:
    #ranges are zerobased
    for i in range(1,11): 
        print(f"You have reached position {i} in game life {game_lives}")
    if game_state == True:
        game_lives +=1
#print("Thank you for playing.")
