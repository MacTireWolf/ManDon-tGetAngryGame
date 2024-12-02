package com.playersNames.playersNames.model;

public class Player {
    private String red;
    private String blue;
    private String yellow;
    private String green;

    public Player(String red, String blue, String yellow, String green) {
        this.red = red;
        this.blue = blue;
        this.yellow = yellow;
        this.green = green;
    }

    public String getRed() {
        return red;
    }

    public String getBlue() {
        return blue;
    }

    public String getYellow() {
        return yellow;
    }

    public String getGreen() {
        return green;
    }

    public void setRed(String red) {
        this.red = red;
    }

    public void setGreen(String green) {
        this.green = green;
    }

    public void setYellow(String yellow) {
        this.yellow = yellow;
    }

    public void setBlue(String blue) {
        this.blue = blue;
    }
}
