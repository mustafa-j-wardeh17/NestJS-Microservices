import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>
    ) { }

    //---------------------------------
    //------Get All Products-----------
    //---------------------------------
    async all(): Promise<Product[]> {
        return await this.productModel.find().exec() // Executes the query and returns a Promise
    }


    //---------------------------------
    //--------Create Product-----------
    //---------------------------------
    // async create(data): Promise<Product> {
    //     const createdProduct = await this.productModel.create(data);
    //     return await this.productModel.save(createdProduct)
    // }

    //---------------------------------
    //----------Get Product------------
    //---------------------------------
    async get(id: number): Promise<Product> {
        const findProduct = await this.productModel.findOne({ where: { id } })
        if (!findProduct) {
            throw new NotFoundException(`Oops: Product with id=${id} deos not existing!!`)
        }
        return findProduct
    }
}
