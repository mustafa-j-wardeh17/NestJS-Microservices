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
    async create(data): Promise<Product> {
        return new this.productModel(data).save()
    }

    //---------------------------------
    //----------Get Product------------
    //---------------------------------
    async get(id: number): Promise<Product> {
        const findProduct = await this.productModel.findOne({ id })
        if (!findProduct) {
            throw new NotFoundException(`Oops: Product with id=${id} deos not existing!!`)
        }
        return findProduct
    }

    //---------------------------------
    //--------Update Product-----------
    //---------------------------------
    async update(data): Promise<Product> {
        const findProduct = await this.productModel.findOne({ id: data.id })
        if (!findProduct) {
            throw new NotFoundException(`Oops: Product with id=${data.id} deos not existing!!`)
        }
        // Update the product
        await this.productModel.updateOne(
            { id: data.id }, // Match condition
            { $set: { ...data } }, // Update only the fields in `data`
        );

        return this.productModel.findOne({ id: data.id });
    }

    //---------------------------------
    //--------Delete Product-----------
    //---------------------------------
    async delete(id): Promise<string> {
        const findProduct = await this.productModel.findOne({ id })
        if (!findProduct) {
            throw new NotFoundException(`Oops: Product with id=${id} deos not existing!!`)
        }
        // Delete the product
        await this.productModel.deleteOne({ id })

        return `Product with id=${id} deleted successfully`
    }

}
