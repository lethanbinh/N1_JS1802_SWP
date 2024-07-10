package com.code.BE.repository;

import com.code.BE.model.entity.StaffDashboardDaily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends JpaRepository<StaffDashboardDaily, Integer> {
}
