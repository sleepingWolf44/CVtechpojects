import random
#everything is inclosed in the function game as to call it when ending so that it restarts
def game(money):
    def ScoreCard(Carddeck):
    #simple function to score cards
        i = 0
        for x in Carddeck:
            if x=="Jack" or x=="Queen" or x=="King":
                i+=10
            elif x=="Ace":
                i+=11
            else:
                i+=x
        return i
    def End(Dscore, Pscore, Dcards, Pcards, money, bet):
        #function used to determin who wins unless a bust or auto win happens also restarts the game
        if Dscore>Pscore:
            #you lose
            print("the dealer had", Dcards, "or", Dscore, "points which beat your", Pcards, "or", Pscore, "points, which means you lost")
            money = int(money)-int(bet)
            bet = 0
            return money
        elif Dscore<Pscore:
            #you win
            print("you had", Pcards, "or", Pscore, "points which beat the dealers", Dcards, "or", Dscore, "points, which means you won")
            money = int(money)+int(bet)
            bet = 0
            return money
        else:
            #you tie
            print("you had", Pcards, "while the dealer had", Dcards, "which both equal", Pscore, "points, which means you tied")
            bet = 0
            return money
    #full deck for cards
    Cards = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,"Jack","Jack","Jack","Jack","Queen","Queen","Queen","Queen","King","King","King","King","Ace","Ace","Ace","Ace"]
    #shuffes the cards so that every games has diffrent cards
    random.shuffle(Cards)
    #asks for the bet you want to place
    if money == 0:
        print("you lost all your money better luck next time")
        exit()
    print("you have", money, "dollars, how much money do you want to bet?(only do numbers)")
    bet=0
    bet = int(input())
    if(bet>money):
        print("please bet with money you have")
        game(money)
    #gives card how a dealer would deal in blackjack(this has no effect on the game)
    DealerCards = [Cards[1],Cards[3]]
    DealerScore = ScoreCard(DealerCards)
    PlayerCards = [Cards[2],Cards[4]]
    PlayerScore = ScoreCard(PlayerCards)
    #if player or dealer alreald has 21 with a 10 or face plus ace they just win
    if PlayerScore == 21 or DealerScore > 21:
        print("you auto win")
        money = int(money)+int(bet)
        bet = 0
        game(money)
    elif DealerScore == 21 or PlayerScore > 21:
        print("you auto lose")
        money = int(money)-int(bet)
        bet = 0
        game(money)
    print("the dealer card shows", Cards[1],"while you have", PlayerCards, "which equals", PlayerScore, "hit or hold?")
    HitorHold = input()
    p = 1
    c = 4
    #infinite loop so that you dont need to worry about the calculation stoping
    while p==1:
        #code for when the payer hold that decide dearlers choice and start the end process
        if HitorHold == "hold" or HitorHold == "Hold":
            #in blackjack the dealer hits if they have a 16 or lower but past 17 the must hold
            while DealerScore<17:
                c+=1
                #code to add a card to dealers hand that makes sure not to duplicate cards
                DealerCards.append(Cards[c])
                DealerScore = ScoreCard(DealerCards)
            if DealerScore>21:
                        print("the dealer went over 21 with a score of", DealerScore, "and lost")
                        money = int(money)+int(bet)
                        bet = 0
                        game(money)
            else:
                money = End(DealerScore, PlayerScore, DealerCards, PlayerCards, money, bet)
                game(money)
        #if hit is selected a loop starts to gain cards until the player chooses to stop
        elif HitorHold == "hit" or HitorHold == "Hit":
            while HitorHold == "hit" or HitorHold == "Hit":
                c+=1
                #code to add a card to Players hand that makes sure not to duplicate cards
                PlayerCards.append(Cards[c])
                PlayerScore = ScoreCard(PlayerCards)
                print("you drew a", Cards[c])
                #if a bust happens checks for ace to turn them into a one then ends game if thier is no ace
                if PlayerScore>21:
                    card = 0
                    for n in PlayerCards:
                        if n=="Ace":
                             PlayerCards[card] = 1
                        card+=1
                    PlayerScore = ScoreCard(PlayerCards)
                    print(PlayerScore)
                    if PlayerScore>21:
                        print("you went over 21 with a score of", PlayerScore, "and lost")
                        money = int(money)-int(bet)
                        bet = 0
                        game(money)
                    print("you now have", PlayerCards, "which scores", PlayerScore, "hit or hold?")
                    HitorHold = input()
                #if you hit a 21 you win unless dealer can get a 21 then its a tie
                elif PlayerScore==21:
                    #dealer sees if they can get a 21 before the hard stop of 17
                    while DealerScore<17:
                        c+=1
                        #code to add a card to dealers hand that makes sure not to duplicate cards
                        DealerCards.append(Cards[c])
                        DealerScore = ScoreCard(DealerCards)
                    if DealerScore == 21:
                        print("you had", PlayerCards, "while the dealer had", DealerCards, "which both equal 21 points, which means you tied")
                        bet = 0
                        game(money)
                    else:
                        print("you hit 21 with", PlayerCards, "and won")
                        money = int(money)+int(bet)
                        bet = 0
                        game(money)
                else:
                    #ask if the player wants to continue the loop 
                    print("you now have", PlayerCards, "which scores", PlayerScore, "hit or hold?")
                    HitorHold = input()
game(500)