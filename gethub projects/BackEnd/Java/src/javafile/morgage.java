package javafile;

import java.text.NumberFormat;
import java.util.Scanner;

public class morgage {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.print("Principal: ");
		long Principal = scanner.nextLong();
		System.out.print("Annual Interest Rate: ");
		double Interest = scanner.nextDouble();
		System.out.print("Period (Years): ");
		byte Years = scanner.nextByte();
		double month = (Interest/100)/12;
		long MYears = Years*12;
		double equation = Math.pow((1+month),MYears);
		double div = (month * equation)/(equation-1);
		double mort = Principal * div;
		NumberFormat Mortgage = NumberFormat.getCurrencyInstance();
		String result = Mortgage.format(mort);
		System.out.println("Mortgage: "+  result);
		scanner.close();
	}

}