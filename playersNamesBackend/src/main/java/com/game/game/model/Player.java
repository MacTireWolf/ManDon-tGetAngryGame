package com.playersNames.playersNames.model;

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
        for (int index = 0; index < 4; index++) {
            pawns.add(new Pawn(index + 1, 0));
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

    public void movePawn(Integer pawnId, Integer steps){
        Pawn pawn = pawns.get(pawnId - 1);
        pawn.setPosition(pawn.getPosition() + steps);
    }
}
