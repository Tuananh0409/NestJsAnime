import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>){}

    create(dto: CreateCategoryDto){
        const category = this.categoryRepository.create(dto);
        return this.categoryRepository.save(category)
    }

    findAll(){
        return this.categoryRepository.find();
    }

    findOne(id: number){
        return this.categoryRepository.findOne({
            where: {id}
        })
    }

    async remove(id: number){
        await this.categoryRepository.delete(id);
        return {
            message: "Delete successfully"
        }
    }
}
