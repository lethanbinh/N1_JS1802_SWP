package com.code.BE.repository;

import com.code.BE.model.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    Message findById(int id);

    @Query("SELECT m FROM Message m WHERE (m.sender.id = :senderId AND m.receiver.id = :receiverId) OR (m.sender.id = :receiverId AND m.receiver.id = :senderId) ORDER BY m.date ASC")
    List<Message> getPrivateMessage(@Param("senderId") int senderId, @Param("receiverId") int receiverId);

    @Query("SELECT m FROM Message m WHERE m.receiver IS NULL ORDER BY m.date ASC")
    List<Message> getPublicMessage();
}
