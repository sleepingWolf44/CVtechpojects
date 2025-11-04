import random
import pygame
import time
# Initialize Pygame
pygame.init()

# Screen dimensions
screen_width = 1000
screen_height = 600
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption("BlackJack")
running = True
# Game loop
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    screen.fill((53, 101, 77))  #Green
    def game(money,wins,loses):
        def ScoreCard(Carddeck):
        #simple function to score cards
            i = 0
            for x in Carddeck:
                x = x.replace('d', '')
                x = x.replace('h', '')
                x = x.replace('s', '')
                x = x.replace('c', '')
                if x=="J" or x=="Q" or x=="K":
                    i+=10
                elif x=="A":
                    i+=11
                else:
                    i+=int(x)
            return i
        def End(Dscore, Pscore, money, bet):
            #function used to determin who wins unless a bust or auto win happens also restarts the game
            if Dscore>Pscore:
                #you lose
                alert("the dealer had more points than you, which means you lost")
                money = int(money)-int(bet)
                bet = 0
                return [money, "lose"]
            elif Dscore<Pscore:
                #you win
                alert("you had more points which beat the dealer, which means you won")
                money = int(money)+int(bet)
                bet = 0
                return [money, "win"]
            else:
                #you tie
                alert("you and the dealer had equal points, which means you tied")
                bet = 0
                return money
        def render(bet, money, bettext):
            screen.fill((53, 101, 77))
            bigfont = pygame.font.Font('freesansbold.ttf', 52)
            smallfont = pygame.font.Font('freesansbold.ttf', 24)
            if bettext:
                bettext = bigfont.render("Bet:", True, (0,0,0))
                betT = bigfont.render(str(bet), True, (0,0,0))
                updown = smallfont.render("up and down arrow to change bet enter to end bet placement", True, (0,0,0))
                UDRect = updown.get_rect()
                BRect = bettext.get_rect()
                TRect = betT.get_rect()
                BRect.center = (500,300)
                TRect.center = (500,350)
                UDRect.center = (500,400)
                screen.blit(betT, TRect)
                screen.blit(updown, UDRect)
                screen.blit(bettext, BRect)
            winlose = "Score:" + str(wins) + "/" + str(loses)
            win = smallfont.render(winlose, True, (0,0,0))
            mon = smallfont.render("money:", True, (0,0,0))
            moneyvar = smallfont.render(str(money), True, (0,0,0))
            MRect = mon.get_rect()
            WRect = mon.get_rect()
            MonRect = moneyvar.get_rect()
            WRect.center = (900,50)
            MRect.center = (40,20)
            MonRect.center = (40,40)
            screen.blit(win, WRect)
            screen.blit(mon, MRect)
            screen.blit(moneyvar, MonRect)
            pygame.display.update()
        def alert(strng):
            screen.fill((53, 101, 77))
            bigestfont = pygame.font.Font('freesansbold.ttf', 25)
            alert = bigestfont.render(strng, True, (0,0,0))
            ARect = alert.get_rect()
            ARect.center = (500,300)
            screen.blit(alert, ARect)
            pygame.display.update()
            time.sleep(2)
        def showcard(card, player, location):
            card = "imgs/cards/" + card + ".png"
            if player:
                imp = pygame.image.load(card).convert()
                screen.blit(imp, (location, 400))
                pygame.display.flip()
                pygame.display.update()
            else:
                imp = pygame.image.load(card).convert()
                screen.blit(imp, (location, 100))
                pygame.display.flip()
                pygame.display.update()

        #full deck for cards
        Cards = ["c2","d2","h2","s2","c3","d3","h3","s3","c4","d4","h4","s4","c5","d5","h5","s5","c6","d6","h6","s6","c7","d7","h7","s7","c8","d8","h8","s8","c9","d9","h9","s9","c10","d10","h10","s10","cJ","dJ","hJ","sJ","cQ","dQ","hQ","sQ","cK","dK","hK","sK","cA","dA","hA","sA"]
        #shuffes the cards so that every games has diffrent cards
        random.shuffle(Cards)
        if money == 0:
            alert("you lost all your money better luck next time")
            exit()
        bet=0
        render(bet, money, True)
        betgoing = True
        while betgoing:
             pygame.display.update()
             for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_UP:
                        if bet<money:
                            if bet>(money-20):
                                bet = money
                                render(bet, money, True)
                            else:
                                bet += 20
                                render(bet, money, True)
                    elif event.key == pygame.K_DOWN:
                        if bet>0:
                            if bet<20:
                                bet = 0
                                render(bet, money, True)
                            else:
                                bet -= 20
                                render(bet, money, True)
                    elif event.key == pygame.K_a:
                        bet=money
                        render(bet, money, True)
                    elif event.key == pygame.K_RETURN:
                        render(bet, money, False)
                        betgoing = False
        #gives card how a dealer would deal in blackjack(this has no effect on the game)
        DealerCards = [Cards[1],Cards[3]]
        DealerScore = ScoreCard(DealerCards)
        showencards = [DealerCards[0]]
        hiddenScore = ScoreCard(showencards)
        PlayerCards = [Cards[2],Cards[4]]
        PlayerScore = ScoreCard(PlayerCards)
        #if player or dealer alreald has 21 with a 10 or face plus ace they just win
        if PlayerScore == 21 or DealerScore > 21:
            alert("you auto win")
            time.sleep(1)
            money = int(money)+int(bet)
            bet = 0
            wins+=1
            game(money, wins, loses)
        showcard(PlayerCards[0], True, 20)
        showcard(PlayerCards[1], True, 40)
        showcard(DealerCards[0], False, 20)
        font = pygame.font.Font('freesansbold.ttf', 18)
        pS = font.render("player score:", True, (0,0,0))
        pRect = pS.get_rect()
        pRect.center = (60,350)
        screen.blit(pS, pRect)
        psS = font.render(str(PlayerScore), True, (0,0,0))
        psRect = psS.get_rect()
        psRect.center = (140,350)
        screen.blit(psS, psRect)
        dS = font.render("dealer score:", True, (0,0,0))
        dRect = dS.get_rect()
        dRect.center = (60,250)
        screen.blit(dS, dRect)
        dsS = font.render(str(hiddenScore), True, (0,0,0))
        dsRect = dsS.get_rect()
        dsRect.center = (140,250)
        screen.blit(dsS, dsRect)
        hS = font.render("press \'h\' to hit or \'s\' to stay", True, (0,0,0))
        hRect = hS.get_rect()
        hRect.center = (500,300)
        screen.blit(hS, hRect)
        pygame.display.update()
        hitorstay = True
        while hitorstay:
             pygame.display.update()
             for event in pygame.event.get():
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_h:
                        HitorHold = "hit"
                        hitorstay = False
                    elif event.key == pygame.K_s:
                        HitorHold = "hold"
                        hitorstay = False
                        
        p = 1
        c = 4
        d = 60
        #infinite loop so that you dont need to worry about the calculation stoping
        while p==1:
            #code for when the payer hold that decide dearlers choice and start the end process
            if HitorHold == "hold":
                showcard(DealerCards[1], False, 40)
                time.sleep(1)
                #in blackjack the dealer hits if they have a 16 or lower but past 17 the must hold
                while DealerScore<17:
                    c+=1
                    #code to add a card to dealers hand that makes sure not to duplicate cards
                    showcard(Cards[c], False, d)
                    DealerCards.append(Cards[c])
                    DealerScore = ScoreCard(DealerCards)
                    d+=20
                    dsS = font.render(str(DealerScore), True, (0,0,0))
                    dsRect = dsS.get_rect()
                    dsRect.center = (140,250)
                    screen.fill((53, 101, 77), dsRect)
                    screen.blit(dsS, dsRect)
                    pygame.display.update()
                    time.sleep(1)
                if DealerScore>21:
                            alert("the dealer went over 21 and lost")
                            money = int(money)+int(bet)
                            bet = 0
                            wins+=1
                            game(money,wins,loses)
                else:
                    money = End(DealerScore, PlayerScore,money, bet)
                    if str(money[1]) == "lose":
                        loses+=1
                    elif str(money[1]) =="win":
                        wins+=1
                    game(money[0], wins, loses)
            #if hit is selected a loop starts to gain cards until the player chooses to stop
            elif HitorHold == "hit":
                while HitorHold == "hit":
                    c+=1
                    #code to add a card to Players hand that makes sure not to duplicate cards
                    PlayerCards.append(Cards[c])
                    showcard(Cards[c], True, d)
                    d+=20
                    PlayerScore = ScoreCard(PlayerCards)
                    psS = font.render(str(PlayerScore), True, (0,0,0))
                    psRect = psS.get_rect()
                    psRect.center = (140,350)
                    screen.fill((53, 101, 77), psRect)
                    screen.blit(psS, psRect)
                    pygame.display.update()
                    time.sleep(1)
                    #if a bust happens checks for ace to turn them into a one then ends game if thier is no ace
                    if PlayerScore>21:
                        card = 0
                        for n in PlayerCards:
                            n = n.replace('d', '')
                            n = n.replace('h', '')
                            n = n.replace('s', '')
                            n = n.replace('c', '')
                            if n=="A":
                                PlayerCards[card] = "1"
                            card+=1
                        PlayerScore = ScoreCard(PlayerCards)
                        psS = font.render(str(PlayerScore), True, (0,0,0))
                        psRect = psS.get_rect()
                        psRect.center = (140,350)
                        screen.fill((53, 101, 77), psRect)
                        screen.blit(psS, psRect)
                        pygame.display.update()
                        time.sleep(1)
                        if PlayerScore>21:
                            alert("you went over 21 and lost")
                            money = int(money)-int(bet)
                            bet = 0
                            loses+=1
                            game(money, wins, loses)
                        hitorstay = True
                        while hitorstay:
                            pygame.display.update()
                            for event in pygame.event.get():
                                    if event.type == pygame.KEYDOWN:
                                        if event.key == pygame.K_h:
                                            HitorHold = "hit"
                                            hitorstay = False
                                        elif event.key == pygame.K_s:
                                            HitorHold = "hold"
                                            hitorstay = False
                    #if you hit a 21 you win unless dealer can get a 21 then its a tie
                    elif PlayerScore==21:
                        showcard(DealerCards[1], False, 40)
                        #dealer sees if they can get a 21 before the hard stop of 17
                        while DealerScore<17:
                            c+=1
                            #code to add a card to dealers hand that makes sure not to duplicate cards
                            showcard(Cards[c], False, d)
                            DealerCards.append(Cards[c])
                            DealerScore = ScoreCard(DealerCards)
                            d+=20
                            dsS = font.render(str(DealerScore), True, (0,0,0))
                            dsRect = dsS.get_rect()
                            dsRect.center = (140,250)
                            screen.fill((53, 101, 77), dsRect)
                            screen.blit(dsS, dsRect)
                            pygame.display.update()
                            time.sleep(1)
                        if DealerScore == 21:
                            alert("you and the dealer had 21 points, which means you tied")
                            bet = 0
                            game(money, wins,loses)
                        else:
                            alert("you hit 21 with and won")
                            money = int(money)+int(bet)
                            bet = 0
                            wins+=1
                            game(money,wins,loses)
                    else:
                        #ask if the player wants to continue the loop 
                        hitorstay = True
                        while hitorstay:
                            pygame.display.update()
                            for event in pygame.event.get():
                                    if event.type == pygame.KEYDOWN:
                                        if event.key == pygame.K_h:
                                            HitorHold = "hit"
                                            hitorstay = False
                                        elif event.key == pygame.K_s:
                                            HitorHold = "hold"
                                            hitorstay = False
    game(500,0,0)
# Quit Pygame
pygame.quit()
quit()
