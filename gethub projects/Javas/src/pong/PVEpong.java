package pong;

import java.awt.*;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import java.awt.event.MouseEvent;
import java.awt.event.MouseMotionListener;
import javax.swing.*;

public class PVEpong {
	static JFrame f = new JFrame("Pong");
	public static void main(String[] args) {
		f.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
		f.setSize(650,495);
		PongGame game = new PongGame();
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
	
	public static class PongGame extends JPanel implements MouseMotionListener{
		static final int WINDOW_WIDTH = 640, WINDOW_HEIGHT = 480;
		private Ball gameBall;
		private Paddle userPaddle, pcPaddle;
		private int userScore, pcScore;
		private int userMouseY;
		private int bounceCount;
		public PongGame() {
			gameBall = new Ball(300,200,3,3,3,Color.YELLOW,10);
			userPaddle = new Paddle(10,200,75,3,Color.BLUE);
			pcPaddle = new Paddle(610,200,75,3,Color.RED);
			userMouseY = 0;
			userScore =0;pcScore=0;
			bounceCount = 0;
			addMouseMotionListener(this);
		}
		public void paintComponent(Graphics g) {
			g.setColor(Color.BLACK);
			g.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
			gameBall.paint(g);
			userPaddle.paint(g);
			pcPaddle.paint(g);
			g.setColor(Color.WHITE);
			g.drawString("Score - User ["+ userScore + "]    PC[" + pcScore +"]", 250, 20);
			g.drawString("Speed ["+ gameBall.getSpeed()  + "] ", 540, 20);
		}
		public void gameLogic() {
			gameBall.moveBall();
			gameBall.bounceOffEdges(0, WINDOW_HEIGHT);
			userPaddle.moveTowards(userMouseY);
			pcPaddle.moveTowards(gameBall.getY());
			if(pcPaddle.checkCollision(gameBall) || userPaddle.checkCollision(gameBall)){
				bounceCount++;
	            gameBall.reverseX();
	        }
			if(bounceCount == 5) {
				bounceCount = 0;
				gameBall.speedUP();
			}
			if(gameBall.getX()<0) {
				pcScore++;
				reset();
			}
			else if(gameBall.getX()>WINDOW_WIDTH) {
				userScore++;
				reset();
			}
		}
		public void reset() {
			gameBall.setX(300);
			gameBall.setY(200);
			gameBall.setCx(3);
			gameBall.setCy(3);
			gameBall.setSpeed(3);
			bounceCount = 0;
			try {
				Thread.sleep(100);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		}
		@Override
		public void mouseDragged(MouseEvent e) {
			
			
		}
		@Override
		public void mouseMoved(MouseEvent e) {
			userMouseY = e.getY();
			
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
				}
			}
			if(centerY<moveToY) {
				y+=speed;
			}
		}
		public boolean checkCollision(Ball b) {
			int rightX = x + PADDLE_WIDTH;
			int bottomY = y + height;
			if(b.getX()>(x-b.getSize()) && b.getX()<rightX) {
				if(b.getY()>y && b.getY()<bottomY) {
					return true;
				}
			}
			return false;
		}
	}
	
}