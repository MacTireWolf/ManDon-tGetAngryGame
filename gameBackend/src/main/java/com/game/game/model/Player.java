package com.game.game.model;

import java.util.ArrayList;
import java.util.List;

public class Player {
    private String name;
    private String colour;
    private List<Pawn> pawns;

    public Player(String name, String colour) {
        this.name = name;
        this.colour = colour;
        this.pawns = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            pawns.add(new Pawn(i + 1, 0));
        }
    }

    public String getName() {
        return name;
    }

    public String getColour() {
        return colour;
    }

    public List<Pawn> getPawns() {
        return pawns;
    }

    public void setPawns(List<Pawn> pawns) {
        this.pawns = pawns;
    }

    public void movePawn(Integer pawnId, Integer steps) {

        Pawn pawn = pawns.get(pawnId - 1);

        if (pawn.getPosition() == 0 && steps == 6) {
            switch (colour) {
                case "red": pawn.setPosition(2); break;
                case "blue": pawn.setPosition(14); break;
                case "yellow": pawn.setPosition(17); break;
                case "green": pawn.setPosition(5); break;
            }
        } else {
            pawn.setPosition(pawn.getPosition() + steps);
        }
    }
}
