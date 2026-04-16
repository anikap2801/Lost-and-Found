package com.project.lostfound.service;

import com.project.lostfound.model.Item;
import com.project.lostfound.model.Reporter;
import com.project.lostfound.model.enums.ItemStatus;
import com.project.lostfound.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private NotificationManager notificationManager;

    public Item reportItem(String name, String description, String location, Reporter reporter) {
        Item item = new Item(name, description, location, reporter);
        Item savedItem = itemRepository.save(item);

        // Notify observers (moderators) about new item
        notificationManager.notifyObservers("New item reported: " + name + " at " + location);

        return savedItem;
    }

    public List<Item> getAvailableItems() {
        return itemRepository.findByStatus(ItemStatus.AVAILABLE);
    }

    public List<Item> searchItems(String query) {
        return itemRepository.findByNameContainingIgnoreCase(query);
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public Item updateItemStatus(Long itemId, ItemStatus status) {
        Optional<Item> itemOpt = itemRepository.findById(itemId);
        if (itemOpt.isPresent()) {
            Item item = itemOpt.get();
            item.setStatus(status);
            return itemRepository.save(item);
        }
        throw new RuntimeException("Item not found");
    }
}
