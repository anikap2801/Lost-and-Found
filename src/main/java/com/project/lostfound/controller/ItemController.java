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
    public ResponseEntity<Item> reportItem(@RequestBody Item requestItem) {

        User user = userRepository.findById(requestItem.getReporter().getId()).orElse(null);

        if (!(user instanceof Reporter)) {
            return ResponseEntity.badRequest().build();
        }

        Reporter reporter = (Reporter) user;

        Item item = itemService.reportItem(
                requestItem.getName(),
                requestItem.getDescription(),
                requestItem.getLocation(),
                reporter
        );

        // 🔥 CRITICAL LINE
        item.setImage(requestItem.getImage());

        Item savedItem = itemService.saveItem(item);

        return ResponseEntity.ok(savedItem);
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

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String location) {
        return itemService.getItemById(id)
                .map(item -> {
                    item.setName(name);
                    item.setDescription(description);
                    item.setLocation(location);
                    Item savedItem = itemService.saveItem(item);
                    return ResponseEntity.ok(savedItem);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        if (itemService.getItemById(id).isPresent()) {
            itemService.deleteItem(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
