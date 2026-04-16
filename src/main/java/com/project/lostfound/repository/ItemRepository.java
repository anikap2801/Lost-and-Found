package com.project.lostfound.repository;

import com.project.lostfound.model.Item;
import com.project.lostfound.model.enums.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByStatus(ItemStatus status);

    List<Item> findByNameContainingIgnoreCase(String name);
}
