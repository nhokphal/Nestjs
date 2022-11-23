import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  // validating if value is not empty
  @IsNotEmpty()
  title: string;

  // validating if value is not empty

  @IsNotEmpty()
  description: string;
}
