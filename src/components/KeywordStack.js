import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/esm/Badge";
import Stack from "react-bootstrap/esm/Stack";

function KeywordStack({handleAddKeyword, handleRemoveKeyword, keywords}) {
  return (
    <>
        <Button variant="primary" type="button" onClick={handleAddKeyword}>
                    Add Keyword
        </Button>
        <Stack gap={3} direction="horizontal">
            {
                keywords.map((key, idx) => {
                    return(
                        <Button variant='light'>
                        {key}
                            <Badge 
                                onClick={() => handleRemoveKeyword(idx)}
                                bg="secondary">
                                <span aria-hidden="true">&times;</span>
                            </Badge>
                        </Button>
                    )
                })
            }
        </Stack>
    </>
  );
}

export default KeywordStack;