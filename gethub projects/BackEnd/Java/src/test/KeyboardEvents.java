package test;

import javax.swing.*;
import java.awt.*;    
import java.awt.event.*;    


public class KeyboardEvents extends JPanel {
    private int HEIGHT = 500;
    private int WIDTH = 400;
    private int size = 50;
    
    private JFrame  frame;

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.blue);
        // Offset the position to keep it centered
        int pos = 150 - (int) (size * 0.5);
        
        // Draw the rectangle
        g.fillRect(pos, pos, size, size);
    }

    public void createAndShowGUI(){
        JFrame frame = new JFrame("Events Demo");
        frame.setPreferredSize(new Dimension(WIDTH, HEIGHT));
        frame.getContentPane().add(this, BorderLayout.CENTER);
        frame.pack();
        frame.setVisible(true);
        
        // Add listener to the frame
        frame.addKeyListener(new KeyAdapter() {
            // Key Pressed method
            public void keyPressed(KeyEvent e) {
                // Check if an up key was pressed
                if(e.getKeyCode() == KeyEvent.VK_UP){
                    size += 5;
                }
                // Check if a down key was pressed
                if(e.getKeyCode() == KeyEvent.VK_DOWN){
                    size -=5;
                }
                // Call the repaint
                repaint();
            }
        });
    }
    
    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                KeyboardEvents project = new KeyboardEvents();
                project.createAndShowGUI();
            }
        });
    }
}

