package game.java;

import java.util.Scanner;

public class game {

	public static void main(String[] args) {
		long money = 200;
		Scanner Scanner = new Scanner(System.in);
		boolean running = true;
		while(running) {
			System.out.print("Start?: ");
			String answer = Scanner.next().toLowerCase();
			System.out.print("you have " + money + " whats Bet?: ");
			long bet = Scanner.nextLong();
			if(money == 0){
				System.out.print("you're bankrupt YOU LOSE!!");
				running = false;
				break;
			}
			if(bet>money) {
				bet = money;
			}
			if(answer.equals("yes") || answer.equals("y")) {
				int roll1 = (int)(Math.floor((Math.random() * 6)+1));
				int roll2 = (int)(Math.floor((Math.random() * 6)+1));
				int rolls = roll1 + roll2;
				System.out.println("you rolled "+ rolls);
				if(rolls == 11 || rolls == 7) {
					System.out.println("you win " + bet);
					money += bet;
				}
				else if (rolls == 12 || rolls == 3 || rolls == 2) {
					System.out.println("you loss " + bet);
					money -= bet;
				}
				else {
					int point = rolls;
					System.out.println("point is now: " + point);
					boolean Play = true;
					while(Play) {
						System.out.print("Continue?: ");
						String Go = Scanner.next().toLowerCase();
						if(Go.equals("yes") || Go.equals("y")) {
							String cont = Scanner.next().toLowerCase();
							roll1 = (int)(Math.floor((Math.random() * 6)+1));
							roll2 = (int)(Math.floor((Math.random() * 6)+1));
							rolls = roll1 + roll2;
							System.out.println("you rolled "+ rolls);
							if(rolls == point) {
								System.out.println("you win " + bet);
								money += bet;
								Play = false;
							}
							else if (rolls == 7) {
								System.out.println("you loss " + bet);
								money -= bet;
								Play = false;
							}
						}
						else {
							System.out.print("Then leave");
							Play = false;
						}
					}
				}
			}
			else {
				System.out.print("Then leave");
				running = false;
			}
		}
		
		Scanner.close();
	}

}