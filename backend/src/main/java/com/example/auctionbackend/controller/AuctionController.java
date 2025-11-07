package com.example.auctionbackend.controller;

import com.example.auctionbackend.model.Auction;
import com.example.auctionbackend.repo.AuctionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/auctions")
@CrossOrigin(origins = "http://localhost:5175")
public class AuctionController {

    private final AuctionRepository repo;

    public AuctionController(AuctionRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Auction> list() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Auction> get(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Auction> create(@RequestBody Auction auction) {
        // Set current price if not provided
        if (auction.getCurrentPrice() == null) {
            auction.setCurrentPrice(auction.getStartingPrice());
        }

        // Ensure endTime is set (if not provided, set to 24 hours from now)
        if (auction.getEndTime() == null) {
            auction.setEndTime(java.time.Instant.now().plusSeconds(24 * 60 * 60));
        }

        Auction saved = repo.save(auction);
        return ResponseEntity.created(URI.create("/api/auctions/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Auction> update(@PathVariable Long id, @RequestBody Auction auction) {
        return repo.findById(id)
                .map(existing -> {
                    if (auction.getTitle() != null)
                        existing.setTitle(auction.getTitle());
                    if (auction.getDescription() != null)
                        existing.setDescription(auction.getDescription());
                    if (auction.getImage() != null)
                        existing.setImage(auction.getImage());
                    if (auction.getStartingPrice() != null)
                        existing.setStartingPrice(auction.getStartingPrice());
                    if (auction.getCurrentPrice() != null)
                        existing.setCurrentPrice(auction.getCurrentPrice());
                    if (auction.getEndTime() != null)
                        existing.setEndTime(auction.getEndTime());
                    if (auction.getSellerId() != null)
                        existing.setSellerId(auction.getSellerId());
                    if (auction.getSellerName() != null)
                        existing.setSellerName(auction.getSellerName());

                    Auction updated = repo.save(existing);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
