package com.game.game.controller;

import com.game.game.model.MoveRequest;
import com.game.game.model.Player;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/game")
public class GameController {
    private Map<String, Player> players = new HashMap<>();

    @PostMapping("/addPlayer")
    public ResponseEntity<String> addPlayer(@RequestBody Player player){
        if(players.containsKey(player.getColour())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Player already exists for this color");
        }
        players.put(player.getColour(), player);
        return ResponseEntity.ok(players.toString());
    }

    @GetMapping("/getPlayers")
    public ResponseEntity<Map<String, Player>> getPlayers(){
        return ResponseEntity.ok(players);
    }

    @PostMapping("/movePawn")
    public ResponseEntity<Player> movePawn(@RequestBody MoveRequest moveRequest){
        Player player = players.get(moveRequest.getColour());
        if (player != null){
            player.movePawn(moveRequest.getPawnId(), moveRequest.getSteps());
            return ResponseEntity.ok(player);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
