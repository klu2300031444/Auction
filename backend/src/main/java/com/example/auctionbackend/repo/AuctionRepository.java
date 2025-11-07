package com.example.auctionbackend.repo;

import com.example.auctionbackend.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
}
