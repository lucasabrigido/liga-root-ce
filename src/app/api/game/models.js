import { z } from 'zod';

export const SchemaGameSubmission = z.object({
    images: z.array(
        z.string({
            required_error: 'A imagem é obrigatória.',
            invalid_type_error: 'A imagem deve ser uma string.',
        })
    )
        .min(1, 'É necessário pelo menos uma imagem.')
        .max(5, 'O número máximo de imagens permitido é 5.'),

    type: z.union([
        z.literal('LOOSE'),
        z.string().uuid('O tipo deve ser um UUID válido ou "LOOSE".'),
    ], {
        invalid_type_error: 'O tipo deve ser um UUID válido ou "LOOSE".',
        required_error: 'O tipo é obrigatório.',
    }),

    date: z.string({
        required_error: 'A data é obrigatória.',
        invalid_type_error: 'A data deve ser uma string.',
    }).refine(
        (val) => !isNaN(Date.parse(val)),
        { message: 'Data inválida.' }
    ),

    participants: z.array(
        z.object({
            id: z.string({
                required_error: 'O ID do participante é obrigatório.',
                invalid_type_error: 'O ID deve ser uma string UUID.',
            }).uuid('O ID do participante deve ser um UUID válido.'),

            faction: z.string({
                required_error: 'A facção do participante é obrigatória.',
            }),

            points: z.number({
                required_error: 'Os pontos são obrigatórios.',
                invalid_type_error: 'Os pontos devem ser um número.',
            })
                .min(0, 'Os pontos devem ser no mínimo 0.')
                .max(30, 'Os pontos não podem ser maiores que 30.'),
        })
    )
        .min(1, 'É necessário pelo menos um participante.')
        .max(6, 'Máximo de 6 jogadores.')
        .superRefine((participants, ctx) => {
            const seenIds = new Map();
            const seenFactions = new Map();

            participants.forEach((p, index) => {
                if (seenIds.has(p.id)) {
                    const firstIndex = seenIds.get(p.id);

                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'ID duplicado com outro participante.',
                        path: [index, 'id'],
                    });

                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'ID duplicado com outro participante.',
                        path: [firstIndex, 'id'],
                    });
                } else {
                    seenIds.set(p.id, index);
                }

                if (seenFactions.has(p.faction)) {
                    const firstIndex = seenFactions.get(p.faction);

                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Facção duplicada com outro participante.',
                        path: [index, 'faction'],
                    });

                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Facção duplicada com outro participante.',
                        path: [firstIndex, 'faction'],
                    });
                } else {
                    seenFactions.set(p.faction, index);
                }
            });
        }),
});
