package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.StallRequest;
import com.code.BE.model.dto.response.StallResponse;
import com.code.BE.model.entity.Stall;
import com.code.BE.model.entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-07T14:26:13+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.38.0.v20240524-2033, environment: Java 17.0.11 (Eclipse Adoptium)"
)
@Component
public class StallMapperImpl implements StallMapper {

    @Override
    public StallResponse toResponse(Stall stall) {
        if ( stall == null ) {
            return null;
        }

        StallResponse stallResponse = new StallResponse();

        stallResponse.setStaffId( stallStaffId( stall ) );
        stallResponse.setCode( stall.getCode() );
        stallResponse.setDescription( stall.getDescription() );
        stallResponse.setId( stall.getId() );
        stallResponse.setName( stall.getName() );
        stallResponse.setRevenue( stall.getRevenue() );
        stallResponse.setStatus( stall.isStatus() );
        stallResponse.setType( stall.getType() );

        return stallResponse;
    }

    @Override
    public List<StallResponse> toResponseList(List<Stall> stallList) {
        if ( stallList == null ) {
            return null;
        }

        List<StallResponse> list = new ArrayList<StallResponse>( stallList.size() );
        for ( Stall stall : stallList ) {
            list.add( toResponse( stall ) );
        }

        return list;
    }

    @Override
    public Stall toEntity(StallRequest stallRequest) {
        if ( stallRequest == null ) {
            return null;
        }

        Stall stall = new Stall();

        stall.setCode( stallRequest.getCode() );
        stall.setDescription( stallRequest.getDescription() );
        stall.setName( stallRequest.getName() );
        stall.setStatus( stallRequest.isStatus() );
        stall.setType( stallRequest.getType() );

        return stall;
    }

    @Override
    public List<Stall> toEntityList(List<StallRequest> stallRequestList) {
        if ( stallRequestList == null ) {
            return null;
        }

        List<Stall> list = new ArrayList<Stall>( stallRequestList.size() );
        for ( StallRequest stallRequest : stallRequestList ) {
            list.add( toEntity( stallRequest ) );
        }

        return list;
    }

    private int stallStaffId(Stall stall) {
        if ( stall == null ) {
            return 0;
        }
        User staff = stall.getStaff();
        if ( staff == null ) {
            return 0;
        }
        int id = staff.getId();
        return id;
    }
}
