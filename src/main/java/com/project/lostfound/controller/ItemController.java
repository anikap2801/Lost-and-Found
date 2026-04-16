package com.project.lostfound.controller;

import com.project.lostfound.model.Item;
import com.project.lostfound.model.Reporter;
import com.project.lostfound.model.User;
import com.project.lostfound.repository.UserRepository;
import com.project.lostfound.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/report")
    public ResponseEntity<Item> reportItem(@RequestParam String name,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam Long reporterId) {
        User user = userRepository.findById(reporterId).orElse(null);
        if (!(user instanceof Reporter)) {
            return ResponseEntity.badRequest().build();
        }

        Reporter reporter = (Reporter) user;
        Item item = itemService.reportItem(name, description, location, reporter);
        return ResponseEntity.ok(item);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Item>> getAvailableItems() {
        List<Item> items = itemService.getAvailableItems();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Item>> searchItems(@RequestParam String query) {
        List<Item> items = itemService.searchItems(query);
        return ResponseEntity.ok(items);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItem(@PathVariable Long id) {
        return itemService.getItemById(id)
                .map(item -> ResponseEntity.ok(item))
                .orElse(ResponseEntity.notFound().build());
    }
}
