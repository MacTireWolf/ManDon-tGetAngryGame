package com.game.game.model;

public class Pawn {
    private Integer id;
    private Integer position;

    public Pawn(Integer id, Integer position) {
        this.id = id;
        this.position = position;
    }

    public int getId() {
        return id;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }
}
