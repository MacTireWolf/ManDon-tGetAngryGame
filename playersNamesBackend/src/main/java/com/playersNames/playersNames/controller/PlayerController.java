package com.playersNames.playersNames.controller;

import com.playersNames.playersNames.model.Player;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/players")
public class PlayerController {
    private Player currentPlayers = new Player("", "", "", "");

    @GetMapping("/getPlayers")
    public ResponseEntity<Player> getPlayers(){
        return ResponseEntity.ok().body(currentPlayers);
    }

    @PostMapping("/setNames")
    public ResponseEntity<Player> setNames(@RequestBody Player playerName){
        currentPlayers.setRed(playerName.getRed());
        currentPlayers.setBlue(playerName.getBlue());
        currentPlayers.setYellow(playerName.getYellow());
        currentPlayers.setGreen(playerName.getGreen());
        return ResponseEntity.ok().body(currentPlayers);
    }
}
