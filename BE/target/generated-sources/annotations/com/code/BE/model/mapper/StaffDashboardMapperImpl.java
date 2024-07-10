package com.code.BE.model.mapper;

import com.code.BE.model.dto.StaffDashboardDailyDTO;
import com.code.BE.model.entity.StaffDashboardDaily;
import com.code.BE.model.entity.Stall;
import com.code.BE.model.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-07-10T17:10:38+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
)
@Component
public class StaffDashboardMapperImpl implements StaffDashboardMapper {

    @Override
    public StaffDashboardDailyDTO toResponse(StaffDashboardDaily staffDashboardDaily) {
        if ( staffDashboardDaily == null ) {
            return null;
        }

        StaffDashboardDailyDTO staffDashboardDailyDTO = new StaffDashboardDailyDTO();

        staffDashboardDailyDTO.setStaffId( staffDashboardDailyStaffId( staffDashboardDaily ) );
        staffDashboardDailyDTO.setStallId( staffDashboardDailyStallId( staffDashboardDaily ) );
        staffDashboardDailyDTO.setDate( staffDashboardDaily.getDate() );
        staffDashboardDailyDTO.setPurchaseInvoiceRevenue( staffDashboardDaily.getPurchaseInvoiceRevenue() );
        staffDashboardDailyDTO.setSalesInvoiceRevenue( staffDashboardDaily.getSalesInvoiceRevenue() );
        staffDashboardDailyDTO.setReturnInvoiceRevenue( staffDashboardDaily.getReturnInvoiceRevenue() );
        staffDashboardDailyDTO.setTotalCustomersTransacted( staffDashboardDaily.getTotalCustomersTransacted() );
        staffDashboardDailyDTO.setPurchaseInvoiceProductQuantity( staffDashboardDaily.getPurchaseInvoiceProductQuantity() );
        staffDashboardDailyDTO.setSalesInvoiceProductQuantity( staffDashboardDaily.getSalesInvoiceProductQuantity() );
        staffDashboardDailyDTO.setReturnInvoiceProductQuantity( staffDashboardDaily.getReturnInvoiceProductQuantity() );
        staffDashboardDailyDTO.setTotalInvoicesCreated( staffDashboardDaily.getTotalInvoicesCreated() );
        staffDashboardDailyDTO.setTotalInvoicesCompleted( staffDashboardDaily.getTotalInvoicesCompleted() );
        staffDashboardDailyDTO.setTotalBonusPointsAdded( staffDashboardDaily.getTotalBonusPointsAdded() );
        staffDashboardDailyDTO.setTotalProductsInStockStartOfDay( staffDashboardDaily.getTotalProductsInStockStartOfDay() );
        staffDashboardDailyDTO.setTotalProductsInStockEndOfDay( staffDashboardDaily.getTotalProductsInStockEndOfDay() );
        staffDashboardDailyDTO.setTotalReturnedProducts( staffDashboardDaily.getTotalReturnedProducts() );
        staffDashboardDailyDTO.setBestSellingProduct( staffDashboardDaily.getBestSellingProduct() );
        staffDashboardDailyDTO.setBestSellingProductQuantity( staffDashboardDaily.getBestSellingProductQuantity() );
        staffDashboardDailyDTO.setMostStockedProduct( staffDashboardDaily.getMostStockedProduct() );
        staffDashboardDailyDTO.setMostStockedProductQuantity( staffDashboardDaily.getMostStockedProductQuantity() );
        staffDashboardDailyDTO.setTotalDiscountAmount( staffDashboardDaily.getTotalDiscountAmount() );
        staffDashboardDailyDTO.setConfirmStatus( staffDashboardDaily.isConfirmStatus() );

        return staffDashboardDailyDTO;
    }

    @Override
    public List<StaffDashboardDailyDTO> toResponseList(List<StaffDashboardDaily> staffDashboardDailies) {
        if ( staffDashboardDailies == null ) {
            return null;
        }

        List<StaffDashboardDailyDTO> list = new ArrayList<StaffDashboardDailyDTO>( staffDashboardDailies.size() );
        for ( StaffDashboardDaily staffDashboardDaily : staffDashboardDailies ) {
            list.add( toResponse( staffDashboardDaily ) );
        }

        return list;
    }

    @Override
    public StaffDashboardDaily toEntity(StaffDashboardDailyDTO staffDashboardDailyDTO) {
        if ( staffDashboardDailyDTO == null ) {
            return null;
        }

        StaffDashboardDaily staffDashboardDaily = new StaffDashboardDaily();

        staffDashboardDaily.setDate( staffDashboardDailyDTO.getDate() );
        staffDashboardDaily.setPurchaseInvoiceRevenue( staffDashboardDailyDTO.getPurchaseInvoiceRevenue() );
        staffDashboardDaily.setSalesInvoiceRevenue( staffDashboardDailyDTO.getSalesInvoiceRevenue() );
        staffDashboardDaily.setReturnInvoiceRevenue( staffDashboardDailyDTO.getReturnInvoiceRevenue() );
        staffDashboardDaily.setTotalCustomersTransacted( staffDashboardDailyDTO.getTotalCustomersTransacted() );
        staffDashboardDaily.setPurchaseInvoiceProductQuantity( staffDashboardDailyDTO.getPurchaseInvoiceProductQuantity() );
        staffDashboardDaily.setSalesInvoiceProductQuantity( staffDashboardDailyDTO.getSalesInvoiceProductQuantity() );
        staffDashboardDaily.setReturnInvoiceProductQuantity( staffDashboardDailyDTO.getReturnInvoiceProductQuantity() );
        staffDashboardDaily.setTotalInvoicesCreated( staffDashboardDailyDTO.getTotalInvoicesCreated() );
        staffDashboardDaily.setTotalInvoicesCompleted( staffDashboardDailyDTO.getTotalInvoicesCompleted() );
        staffDashboardDaily.setTotalBonusPointsAdded( staffDashboardDailyDTO.getTotalBonusPointsAdded() );
        staffDashboardDaily.setTotalProductsInStockStartOfDay( staffDashboardDailyDTO.getTotalProductsInStockStartOfDay() );
        staffDashboardDaily.setTotalProductsInStockEndOfDay( staffDashboardDailyDTO.getTotalProductsInStockEndOfDay() );
        staffDashboardDaily.setTotalReturnedProducts( staffDashboardDailyDTO.getTotalReturnedProducts() );
        staffDashboardDaily.setBestSellingProduct( staffDashboardDailyDTO.getBestSellingProduct() );
        staffDashboardDaily.setBestSellingProductQuantity( staffDashboardDailyDTO.getBestSellingProductQuantity() );
        staffDashboardDaily.setMostStockedProduct( staffDashboardDailyDTO.getMostStockedProduct() );
        staffDashboardDaily.setMostStockedProductQuantity( staffDashboardDailyDTO.getMostStockedProductQuantity() );
        staffDashboardDaily.setTotalDiscountAmount( staffDashboardDailyDTO.getTotalDiscountAmount() );
        staffDashboardDaily.setConfirmStatus( staffDashboardDailyDTO.isConfirmStatus() );

        return staffDashboardDaily;
    }

    @Override
    public List<StaffDashboardDaily> toEntityList(List<StaffDashboardDailyDTO> staffDashboardDailyDTOS) {
        if ( staffDashboardDailyDTOS == null ) {
            return null;
        }

        List<StaffDashboardDaily> list = new ArrayList<StaffDashboardDaily>( staffDashboardDailyDTOS.size() );
        for ( StaffDashboardDailyDTO staffDashboardDailyDTO : staffDashboardDailyDTOS ) {
            list.add( toEntity( staffDashboardDailyDTO ) );
        }

        return list;
    }

    private int staffDashboardDailyStaffId(StaffDashboardDaily staffDashboardDaily) {
        if ( staffDashboardDaily == null ) {
            return 0;
        }
        User staff = staffDashboardDaily.getStaff();
        if ( staff == null ) {
            return 0;
        }
        int id = staff.getId();
        return id;
    }

    private int staffDashboardDailyStallId(StaffDashboardDaily staffDashboardDaily) {
        if ( staffDashboardDaily == null ) {
            return 0;
        }
        Stall stall = staffDashboardDaily.getStall();
        if ( stall == null ) {
            return 0;
        }
        int id = stall.getId();
        return id;
    }
}
