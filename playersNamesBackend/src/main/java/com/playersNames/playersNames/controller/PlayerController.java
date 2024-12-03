package com.playersNames.playersNames.controller;

import com.playersNames.playersNames.model.Player;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/players")
public class PlayerController {
    private Player currentPlayers = new Player("", "", "", "");

    @GetMapping("/getPlayers")
    public ResponseEntity<Player> getPlayers(){
        return ResponseEntity.ok().body(currentPlayers);
    }

    @PostMapping("/setNames")
    public ResponseEntity<Player> setNames(@RequestBody Map<String, String> playerName){
        playerName.forEach((colour, name) -> {
            switch (colour.toLowerCase()){
                case "red":
                    currentPlayers.setRed(name);
                    break;
                case "blue":
                    currentPlayers.setBlue(name);
                    break;
                case "yellow":
                    currentPlayers.setYellow(name);
                    break;
                case "green":
                    currentPlayers.setGreen(name);
                    break;
            }
        });
        return ResponseEntity.ok().body(currentPlayers);
    }
}
