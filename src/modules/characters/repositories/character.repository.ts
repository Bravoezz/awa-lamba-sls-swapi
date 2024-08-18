import { injectable } from "tsyringe";
import { ICharacterRepository } from "../contracts/character.contracts";
import { ICharacter, ICharacterSwapi } from "../models/character.model";
import { database } from "../../../config/database";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";
import { stringVals } from "../../shared/helpers";
import crypto from "crypto";
import axios from "axios";

@injectable()
export class CharacterRepository implements ICharacterRepository
{
    private TableName = process.env.CHARACTERS_TABLE;
    
    async listLocal(): Promise<ICharacter[]>
    {
        const chars = await database.send(new ScanCommand({
            TableName: this.TableName
        }));

        return chars.Items?.map(char => unmarshall(marshall(char))) as ICharacter[];
    }

    async listSwapi(): Promise<ICharacterSwapi[]>
    {
        return await this.getListFromPage('https://swapi.py4e.com/api/people/');
    }

    async create(character: ICharacter): Promise<boolean>
    {
        try {
            await database.send(new PutCommand({
                TableName: this.TableName,
                Item: {
                    id: crypto.randomUUID(),
                    ...stringVals(character)
                }
            }));

            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }

    private async getListFromPage(url: string): Promise<ICharacterSwapi[]>
    {
        const response = await axios.get(url);
        const results: ICharacterSwapi[] = response.data.results;

        // Si hay una próxima página, realizar una llamada recursiva
        if (response.data.next) {
            const nextPageResults = await this.getListFromPage(response.data.next);
            return results.concat(nextPageResults);
        }

        return results;
    }
}