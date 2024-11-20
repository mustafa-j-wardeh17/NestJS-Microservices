import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ) { }

    //---------------------------------
    //------Get All Products-----------
    //---------------------------------
    async all(): Promise<Product[]> {
        return await this.productsRepository.find();
    }

    //---------------------------------
    //--------Create Product-----------
    //---------------------------------
    async create(data: createProductDto): Promise<Product> {
        const createdProduct = await this.productsRepository.create(data);
        return await this.productsRepository.save(createdProduct)
    }

    //---------------------------------
    //----------Get Product------------
    //---------------------------------
    async get(id: number): Promise<Product> {
        const findProduct = await this.productsRepository.findOne({ where: { id } })
        if (!findProduct) {
            throw new NotFoundException(`Oops: Product with id=${id} deos not existing!!`)
        }
        return findProduct
    }

    //---------------------------------
    //---------Update Product----------
    //---------------------------------
    async update(id: number, data: updateProductDto): Promise<Product> {
        const findProduct = await this.productsRepository.findOne({ where: { id } })
        if (!findProduct) {
            throw new NotFoundException(`Oops: Product with id=${id} deos not existing!!`)
        }
        const updateProduct = await this.productsRepository.preload({
            id,
            ...findProduct,
            ...data
        })

        return await this.productsRepository.save(updateProduct)
    }


    //---------------------------------
    //---------Delete Product----------
    //---------------------------------
    async deleteOne(id: number) {
        const findProduct = await this.productsRepository.findOne({ where: { id } })
        if (!findProduct) {
            throw new NotFoundException(`Oops: Product with id=${id} deos not existing!!`)
        }
        await this.productsRepository.delete(id)
        return `Product with id=${id} deleted successfully`
    }
}

