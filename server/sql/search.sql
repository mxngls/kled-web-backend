select json_agg(
        distinct jsonb_build_object(
            'item',
            jsonb_build_object(
                'Id',
                word.id,
                'Alpha',
                word.alpha,
                'Frequency',
                word.frequency,
                'HomonymNumber',
                word.homonymnumber,
                'Pronounciation',
                word.pronounciation,
                'Audio',
                word.audio,
                'TypeKr',
                word.typekr,
                'TypeEng',
                word.typeeng,
                'Hanja',
                word.hanja,
                'Hangul',
                word.hangul,
                'Senses',
                (
                    select json_agg(
                            jsonb_build_object(
                                'Translation',
                                sense.translation,
                                'Definition',
                                sense.definition,
                                'DefinitionKr',
                                sense.definitionkr,
                                'SenseNr',
                                sense.sensenr
                            )
                        )
                    from sense
                    where sense.id = word.id
                ),
                'Inflection',
                inflection.inflections,
                'InflectionLinks',
                inflection.inflectionlinks
            )
        )
    )
from word
    full join inflection on word.id = inflection.id
    right join sense on word.id = sense.id
where word.hangul similar to concat('%', $1::text, '%')
    or sense.translation similar to concat('%', $1::text, '%')
    or inflection.inflections similar to concat('%', $1::text, '%')
    or word.hanja similar to concat('%', $1::text, '%');