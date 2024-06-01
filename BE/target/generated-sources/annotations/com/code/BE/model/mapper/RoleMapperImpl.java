package com.code.BE.model.mapper;

import com.code.BE.model.dto.request.RoleRequest;
import com.code.BE.model.dto.response.RoleResponse;
import com.code.BE.model.entity.Role;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-31T20:14:14+0700",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.38.0.v20240524-2033, environment: Java 17.0.11 (Eclipse Adoptium)"
)
@Component
public class RoleMapperImpl implements RoleMapper {

    @Override
    public RoleResponse toResponse(Role role) {
        if ( role == null ) {
            return null;
        }

        RoleResponse roleResponse = new RoleResponse();

        roleResponse.setDescription( role.getDescription() );
        roleResponse.setId( role.getId() );
        roleResponse.setName( role.getName() );

        return roleResponse;
    }

    @Override
    public List<RoleResponse> toResponseList(List<Role> roleList) {
        if ( roleList == null ) {
            return null;
        }

        List<RoleResponse> list = new ArrayList<RoleResponse>( roleList.size() );
        for ( Role role : roleList ) {
            list.add( toResponse( role ) );
        }

        return list;
    }

    @Override
    public Role toEntity(RoleRequest roleRequest) {
        if ( roleRequest == null ) {
            return null;
        }

        Role role = new Role();

        role.setDescription( roleRequest.getDescription() );
        role.setName( roleRequest.getName() );

        return role;
    }

    @Override
    public List<Role> toEntityList(List<RoleRequest> roleRequestList) {
        if ( roleRequestList == null ) {
            return null;
        }

        List<Role> list = new ArrayList<Role>( roleRequestList.size() );
        for ( RoleRequest roleRequest : roleRequestList ) {
            list.add( toEntity( roleRequest ) );
        }

        return list;
    }
}
