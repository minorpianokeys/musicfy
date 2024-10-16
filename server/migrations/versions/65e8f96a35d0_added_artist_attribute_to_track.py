"""added artist attribute to Track

Revision ID: 65e8f96a35d0
Revises: de06c6aeec8c
Create Date: 2024-10-10 16:31:25.736074

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '65e8f96a35d0'
down_revision = 'de06c6aeec8c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tracks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('artist', sa.String(), nullable=True))

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.alter_column('_password_hash',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.drop_constraint('email', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint('email', ['email'])
        batch_op.alter_column('_password_hash',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.alter_column('email',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('tracks', schema=None) as batch_op:
        batch_op.drop_column('artist')

    # ### end Alembic commands ###
