package pong;

import java.awt.*;

import javax.swing.*;
import javax.swing.text.Keymap;
import java.util.concurrent.locks.ReentrantLock;
import game.java.game;
import pong.PVPpong.Ball;
import pong.PVPpong.PongGame;
import test.KeyboardEvents;

import java.awt.event.*;

public class PVPpong extends JPanel {
	static JFrame f = new JFrame("Pong");
	public static void main(String[] args) {
		f.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
		f.setSize(650,495);
		PongGame game = new PongGame();
		game.p1Target();
		f.add(game);
		f.setVisible(true);
		Timer timer = new Timer(33, new ActionListener(){
			@Override
			public void actionPerformed(ActionEvent e) {
				game.repaint();
				game.gameLogic();
			}
		});
		timer.start();
	}
	public static class PongGame extends JPanel{
		static final int WINDOW_WIDTH = 640, WINDOW_HEIGHT = 480;
		private Ball gameBall;
		private Paddle p1Paddle, p2Paddle;
		private int p1Score, p2Score;
		private int bounceCount;
		private int p1target = 225, p2target = 225 ;
		private int resetCount = 0;
		public PongGame() {
			gameBall = new Ball(300,200,3,3,3,Color.YELLOW,10);
			p1Paddle = new Paddle(10,200,75,3,Color.BLUE);
			p2Paddle = new Paddle(610,200,75,3,Color.RED);
			p1Score =0;p2Score=0;
			bounceCount = 0;
		}
		public void p1Target() {
			Timer timer = new Timer(150, new ActionListener(){
				private int w=0,k=0,u=0,y=0;
				private static ReentrantLock p1 = new ReentrantLock();
				private static ReentrantLock p2 = new ReentrantLock();
				@Override
				public void actionPerformed(ActionEvent ge) {
							p1.lock(); 
							try 
							{
					    	f.addKeyListener(new KeyAdapter() {
					            public void keyPressed(KeyEvent ke) {
					                switch(ke.getKeyCode()) {
					                case KeyEvent.VK_W:
					                	if(p1target>35 && w==0) {
					                			p1target-=1;
						    					while(w < 1000) {
						    						w++;
						    					}
						    					w=0;
					    				}
					                	break;
					                case KeyEvent.VK_S:
					                	if(p1target<415 && k==0) {
					    					p1target+=1;
					    					while(k < 1000) {
					    						k++;
					    					}
					    					k=0;
					    				}
					                	break;
					            }
					            }
					        });
							}
							finally
					         { 
					            p1.unlock(); 
					         }
							p2.lock(); 
							try 
							{
					    	f.addKeyListener(new KeyAdapter() {
					            public void keyPressed(KeyEvent e) {
					                switch(e.getKeyCode()) {
					                case KeyEvent.VK_UP:
					                	if(p2target>35 && u==0) {
					    					p2target-=1;
					    					while(u < 1000) {
					    						u++;
					    					}
					    					u=0;
					    				}
					                	break;
					                case KeyEvent.VK_DOWN:
					                	if(p2target<415 && y==0) {
					    					p2target+=1;
					    					while(y < 1000) {
					    						y++;
					    					}
					    					y=0;
					    				}
					                	break;
					            }
					            }
					        });
							}
							finally
					         { 
					            p2.unlock(); 
					         }
					    }
			});
			timer.start();
			
		}
		public void paintComponent(Graphics g) {
			g.setColor(Color.BLACK);
			g.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
			gameBall.paint(g);
			p1Paddle.paint(g);
			p2Paddle.paint(g);
			g.setColor(Color.WHITE);
			g.drawString("Score - User ["+ p1Score + "]    PC[" + p2Score +"]", 250, 20);
			g.drawString("Speed ["+ gameBall.getSpeed()  + "] ", 540, 20);
		}
		public void gameLogic() {
			p1Paddle.moveTowards(p1target);
			p2Paddle.moveTowards(p2target);
			gameBall.moveBall();
			gameBall.bounceOffEdges(0, 450);
			if(p2Paddle.checkCollision(gameBall) || p1Paddle.checkCollision(gameBall)){
				bounceCount++;
	            gameBall.reverseX();
	        }
			if(bounceCount == 5) {
				bounceCount = 0;
				gameBall.speedUP();
			}
			if(gameBall.getX()<0) {
				p2Score++;
				reset();
			}
			else if(gameBall.getX()>WINDOW_WIDTH) {
				p1Score++;
				reset();
			}
		}
		public void reset() {
			resetCount++;
			gameBall.setX(300);
			gameBall.setY(200);
			gameBall.setCx(3);
			gameBall.setCy(3);
			gameBall.setSpeed(3);
			if(resetCount%2 == 0) {}
			else {
				gameBall.reverseX();
				gameBall.reverseY();
			}
			bounceCount = 0;
			try {
				Thread.sleep(1000);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		}       
		        
		
	}
	public static class Ball{
		private int x,y,cx,cy,speed,size;
		private Color color;
		public Ball(int x, int y, int cx, int cy, int speed, Color color, int size) {
			this.x = x;
			this.y = y;
			this.cx = cx;
			this.cy = cy;
			this.speed = speed;
			this.color = color;
			this.size = size;
		}
		public void paint(Graphics g) {
			g.setColor(color);
			g.fillOval(x, y, size, size);
		}
		public void moveBall() {
			x+=cx;
			y+=cy;
		}
		public void bounceOffEdges(int top, int bottom) {
			if  (y>bottom - size) {
				reverseY();
			}
			else if  (y<top) {
				reverseY();
			}
		}
		public void reverseX() {
			cx*= -1;
		}
		public void reverseY() {
			cy*= -1;
		}
		public int getY() {
			return y;
		}
		public int getX() {
			return x;
		}
		public int getSize() {
			return size;
		}
		public int getSpeed() {
			return speed;
		}
		public void setX(int Nx) {
			x = Nx;
		}
		public void setY(int Ny) {
			y = Ny;
		}
		public void setCx(int NCx) {
			cx = NCx;
		}
		public void setCy(int NCy) {
			cy = NCy;
		}
		public void setSpeed(int NS) {
			speed = NS;
		}
		public void speedUP() {
			speed++;
			cx = (cx/Math.abs(cx)*speed);
			cy = (cy/Math.abs(cy)*speed);
		}
	}
	
	
	
	public static class Paddle{
		private int height, x, y, speed;
		private Color color;
		static final int PADDLE_WIDTH = 15;
		public Paddle(int x, int y, int height, int speed, Color color) {
			this.x = x;
			this.y = y;
			this.height = height;
			this.speed = speed;
			this.color = color;
		}
		public void paint(Graphics g) {
			g.setColor(color);
			g.drawRect(x, y, PADDLE_WIDTH, height);
		}
		public void moveTowards(int moveToY) {
			int centerY = y+(height/2);
			if(Math.abs(centerY - moveToY)>speed) {
				if(centerY>moveToY) {
					y-=speed;
					return;
				}
			}
			if(centerY<moveToY) {
				y+=speed;
				return;
			}
		}
		public boolean checkCollision(Ball b) {
			int rightX = x + PADDLE_WIDTH;
			int TopY = y + height;
			if(b.getX()>(x-b.getSize()) && b.getX()<rightX) {
				if(b.getY()>y && (b.getY()<TopY+10)) {
					return true;
				}
			}
			return false;
		}
		public int getY() {
			return y;
		}
	}
	
}