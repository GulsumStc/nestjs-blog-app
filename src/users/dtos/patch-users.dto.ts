import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class PatchUsersDto extends PartialType(CreateUserDto) { }

/* PartialType is used to make all properties optional  */