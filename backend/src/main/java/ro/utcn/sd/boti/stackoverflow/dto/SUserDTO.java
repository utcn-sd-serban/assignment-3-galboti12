package ro.utcn.sd.boti.stackoverflow.dto;

import lombok.Data;
import ro.utcn.sd.boti.stackoverflow.entity.SUser;

@Data
public class SUserDTO {
    private Integer id;
    private String username;
    private String password;

    public static SUserDTO ofEntity(SUser user) {
        SUserDTO sUserDTO = new SUserDTO();
        sUserDTO.id = user.getId();
        sUserDTO.username = user.getUsername();
        sUserDTO.password = user.getPassword();
        return sUserDTO;
    }
}
